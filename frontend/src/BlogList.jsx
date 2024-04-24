import "./BlogList.css";

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
        <div key={blog.id}>
          <ul>
            <li className="title">{blog.title}</li>
            <li className="content">{blog.content}</li>
            <button onClick={() => updateBlog(blog)}>
              <i className="fa fa-pencil"></i> Edit
            </button>
            <button onClick={() => onDelete(blog.id)}>
              <i className="fa fa-trash"></i> Delete
            </button>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
