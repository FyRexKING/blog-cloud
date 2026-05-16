const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String
});

const Blog =
    mongoose.model("Blog", BlogSchema);

/*
GET ALL BLOGS
*/

app.get("/api/blogs", async (req, res) => {

    const blogs = await Blog.find();

    res.json(blogs);
});

/*
CREATE BLOG
*/

app.post("/api/blogs", async (req, res) => {

    const blog =
        new Blog(req.body);

    await blog.save();

    res.json(blog);
});

/*
UPDATE BLOG
*/

app.put("/api/blogs/:id", async (req, res) => {

    const updatedBlog =
        await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

    res.json(updatedBlog);
});

/*
DELETE BLOG
*/

app.delete("/api/blogs/:id", async (req, res) => {

    await Blog.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message: "Blog deleted"
    });
});

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Server running on ${PORT}`
    );
});