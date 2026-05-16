import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const API =
    "http://localhost:5000/api/blogs";

  const [blogs, setBlogs] =
    useState([]);

  const [form, setForm] =
    useState({
      title: "",
      content: "",
      author: ""
    });

  const [editId, setEditId] =
    useState(null);

  /*
  FETCH BLOGS
  */

  const fetchBlogs = async () => {

    const res =
      await axios.get(API);

    setBlogs(res.data);
  };

  useEffect(() => {

    fetchBlogs();

  }, []);

  /*
  ADD OR UPDATE BLOG
  */

  const handleSubmit = async () => {

    if (editId) {

      await axios.put(
        `${API}/${editId}`,
        form
      );

      setEditId(null);

    } else {

      await axios.post(API, form);
    }

    setForm({
      title: "",
      content: "",
      author: ""
    });

    fetchBlogs();
  };

  /*
  EDIT BLOG
  */

  const handleEdit = (blog) => {

    setForm({
      title: blog.title,
      content: blog.content,
      author: blog.author
    });

    setEditId(blog._id);
  };

  /*
  DELETE BLOG
  */

  const handleDelete = async (id) => {

    await axios.delete(
      `${API}/${id}`
    );

    fetchBlogs();
  };

  return (

    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        Blog Management System
      </h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px"
        }}
      >

        <input
          type="text"
          placeholder="Blog Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        <textarea
          placeholder="Write blog content..."
          value={form.content}
          onChange={(e) =>
            setForm({
              ...form,
              content: e.target.value
            })
          }
          rows="6"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        <input
          type="text"
          placeholder="Author Name"
          value={form.author}
          onChange={(e) =>
            setForm({
              ...form,
              author: e.target.value
            })
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >

          {
            editId
              ? "Update Blog"
              : "Publish Blog"
          }

        </button>

      </div>

      {
        blogs.map((blog) => (

          <div
            key={blog._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
              boxShadow:
                "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >

            <h2>{blog.title}</h2>

            <p
              style={{
                whiteSpace: "pre-wrap"
              }}
            >
              {blog.content}
            </p>

            <p>
              <strong>
                Author:
              </strong>
              {" "}
              {blog.author}
            </p>

            <button
              onClick={() =>
                handleEdit(blog)
              }
              style={{
                marginRight: "10px",
                padding: "8px 15px"
              }}
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(blog._id)
              }
              style={{
                padding: "8px 15px"
              }}
            >
              Delete
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default App;