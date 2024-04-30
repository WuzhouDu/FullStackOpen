import { useState } from 'react';


const CreateForm = ({ handleClick }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  return (
    <div>
      <h2>create new</h2>
      <div>
                title: <input type="text" value={title} onChange={({ target }) => { setTitle(target.value); }} />
      </div>
      <div>
                author: <input type="text" value={author} onChange={({ target }) => { setAuthor(target.value); }} />
      </div>
      <div>
                url: <input type="url" value={url} onChange={({ target }) => { setUrl(target.value); }} />
      </div>
      <button onClick={() => {
        setAuthor('');
        setTitle('');
        setUrl('');
        handleClick({ title, url, author });
      }}>create</button>
    </div>);
};

export default CreateForm;