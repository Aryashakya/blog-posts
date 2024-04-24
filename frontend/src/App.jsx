import { useState, useEffect } from "react";
import "./App.css";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({});
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await fetch("http://127.0.0.1:5000/blogs");
    const data = await response.json();
    setBlogs(data.blogs);
    console.log(data.blogs);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBlog({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (blog) => {
    if (isModalOpen) return;
    setCurrentBlog(blog);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchBlogs();
  };

  return (
    <>
      <BlogList
        blogs={blogs}
        updateBlog={openEditModal}
        updateCallback={onUpdate}
      />
      <button className="create_button" onClick={openCreateModal}>
        Create New Blog
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <BlogForm existingBlog={currentBlog} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

