import { useState } from "react";

const BlogForm = ({ existingBlog = {}, updateCallback }) => {
  const [title, setTitle] = useState(existingBlog.title || "");
  const [content, setContent] = useState(existingBlog.content || "");

  const updating = Object.entries(existingBlog).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      content,
    };
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_blog/${existingBlog.id}` : "create_blog");
    const options = {
      method: updating ? "PATCH" : " POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
  );
};

export default BlogForm;
