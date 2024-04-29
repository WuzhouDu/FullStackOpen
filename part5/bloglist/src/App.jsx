import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const usr = await loginService.login({ username, password });
      blogService.setToken(usr.token);
      setUser(usr);
      setUsername('');
      setPassword('');
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(usr)
      );
    }
    catch (exception) {
      setNotification(`Wrong credentials!`);
      console.error(`Wrong credentials!`);
      setTimeout(() => {
        setNotification('');
      }, 2000);
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken('');
  }

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );

  const blogList = () => (
    blogs.length === 0 ? null :
      <div>
        <h2>blogs</h2>
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>log out</button>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
  );

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const usr = JSON.parse(loggedUserJson);
      setUser(usr);
      blogService.setToken(usr.token);
    };
  }, []);

  return (
    <div>
      {notification}
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App