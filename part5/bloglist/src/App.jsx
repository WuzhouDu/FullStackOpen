import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ text: '', color: 'green' });
  const [user, setUser] = useState(null);


  const handleClick = async ({title, author, url}) => {
    const newBlog = await blogService.create({ title, author, url, likes: 0 });
    setBlogs(blogs.concat(newBlog).sort((a, b) => a.likes - b.likes));
    setNotification({ color: "green", text: `a new blog ${newBlog.title} by ${newBlog.author}` });
    setTimeout(() => {
      setNotification({ ...notification, text: "" });
    }, 2000);
  }

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
      setNotification({ color: "red", text: "Wrong Credentials" });
      console.error(`Wrong credentials!`);
      setTimeout(() => {
        setNotification({ ...notification, text: "" });
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
          <Blog key={blog.id} blog={blog} handleLike={handleLike} />
        )}
      </div>
  );

  const handleLike = (updatedBlog) => {
    setBlogs(blogs.map((current) => {
      if (current.id === updatedBlog.id) {
        return updatedBlog;
      }
      return current;
    }).sort((a, b) => a.likes - b.likes));
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes - b.likes))
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
      <Notification text={notification.text} color={notification.color} />
      {user === null ? loginForm() :
        <div>
          {blogList()}
          <Togglable buttonLabel="create blog">
            <CreateForm handleClick={handleClick} />
          </Togglable>
        </div>

      }
    </div>
  )
}

export default App