import { useState } from "react";
import blogService from '../services/blogs';


const Blog = ({ blog, handleLike, handleRemove }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const [detail, setDetail] = useState(false);

    const toggleShowDetail = () => {
        setDetail(!detail);
    }

    const internalHandleLike = async () => {
        const updatedOne = await blogService.update(blog.id, { title: blog.title, url: blog.url, likes: Number(blog.likes) + 1, author: blog.author });
        handleLike(updatedOne);
    }

    const internalHandleRemove = async () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            await blogService.remove(blog.id);
            handleRemove(blog.id);
        }
    }

    return detail
        ? (
            <div style={blogStyle}>
                <div>
                    {blog.title} <button onClick={toggleShowDetail}>hide</button>
                </div>
                <div>
                    {blog.url}
                </div>
                <div>
                    {blog.likes} <button onClick={internalHandleLike}>like</button>
                </div>
                <div>
                    {blog.author}
                </div>
                <div>
                    <button onClick={internalHandleRemove}>remove</button>
                </div>
            </div>
        )
        : (
            <div style={blogStyle}>
                <div>
                    {blog.title} {blog.author} <button onClick={toggleShowDetail}>view</button>
                </div>
            </div>);
}

export default Blog