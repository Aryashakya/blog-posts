import React from "react";

const BlogList = ({ blogs, updateBlog, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_blog/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>

      {blogs.map((blog) => (
        <ul key={blog.id}>
          <li>{blog.title}</li>
          <li>{blog.content}</li>
          <button onClick={() => updateBlog(blog)}>Update</button>
          <button onClick={() => onDelete(blog.id)}>Delete</button>
        </ul>
      ))}
    </div>
  );
};

export default BlogList;
