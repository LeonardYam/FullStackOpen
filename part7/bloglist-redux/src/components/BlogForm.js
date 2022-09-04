import { Button } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogListReducer";

const BlogForm = ({ toggle }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    dispatch(createBlog(newBlog));
    setTitle("");
    setAuthor("");
    setUrl("");
    toggle()
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title: </label>
          <input id="title" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor="author">author: </label>
          <input id="author" value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          <label htmlFor="url">url: </label>
          <input id="url" value={url} onChange={handleUrlChange} />
        </div>
        <Button type="submit">create</Button>
      </form>
    </div>
  );
};

export default BlogForm;
