import { useState } from "react";

const Blog = ({ blog }) => {
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
                    {blog.likes} <button>like</button>
                </div>
                <div>
                    {blog.author}
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