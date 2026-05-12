require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Comment = require("./models/Comment");
const blogs = require("./data/blogs");
const Blog = require("./models/Blog");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const app = express();





/* MIDDLEWARE */

app.use(cors());

app.use(express.json());





/* MONGODB CONNECTION */

mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log("MongoDB connected");
  })

  .catch((err) => {
    console.log(err);
  });





/* HOME ROUTE */

app.get("/", (req, res) => {

  res.json({
    message: "Scriptly backend running",
  });

});





/* GET ALL BLOGS */

app.get("/blogs", async (req, res) => {

  try {

    const allBlogs = await Blog.find().sort({
      createdAt: -1,
    });

    res.json(allBlogs);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error",
    });

  }

});





/* GET SINGLE BLOG */

app.get("/blogs/:id", async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id);





    if (!blog) {

      return res.status(404).json({
        message: "Blog not found",
      });

    }

    res.json(blog);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error",
    });

  }

});





/* CREATE BLOG */

app.post("/create-blog", async (req, res) => {

  try {

    const {

  title,
  category,
  image,
  desc,
  content,
  author,

} = req.body;





    const words = content.trim().split(/\s+/).length;

    const readTime = `${Math.ceil(words / 200)} min read`;





    const newBlog = new Blog({

      title,

      category,

      image,

      desc,

      content,





      author,

      date: new Date().toDateString(),

      readTime,

    });





    await newBlog.save();





    res.status(201).json({

      message: "Blog created successfully",

      newBlog,

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      message: "Server error",

    });

  }

});


app.post("/signup", async (req, res) => {

  try {

    const {
  name,
  email,
  password,
  role,
} = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({

  name,
  email,
  password: hashedPassword,
  role,

});

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error",
    });

  }

});

app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid credentials",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials",
      });

    }

    const token = jwt.sign(

      {
        id: user._id,
      },

      "process.env.JWT_SECRET",

      {
        expiresIn: "7d",
      }

    );

    res.json({

      token,

      user: {

        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

      },

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error",
    });

  }

});

app.post("/comments", async (req, res) => {

  try {

    const comment = new Comment(req.body);

    await comment.save();

    await Blog.findByIdAndUpdate(

  req.body.blogId,

  {
    $inc: {
      commentsCount: 1,
    },
  }

);

    res.status(201).json(comment);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error",
    });

  }

});

app.get("/comments/:blogId", async (req, res) => {

  try {

    const comments = await Comment.find({

      blogId: req.params.blogId,

    }).sort({ createdAt: -1 });





    res.json(comments);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error",
    });

  }

});

app.delete("/comments/:id", async (req, res) => {

  try {

    const comment = await Comment.findById(
      req.params.id
    );





    await Blog.findByIdAndUpdate(

      comment.blogId,

      {
        $inc: {
          commentsCount: -1,
        },
      }

    );





    await Comment.findByIdAndDelete(
      req.params.id
    );





    res.json({
      message: "Comment deleted",
    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error",
    });

  }

});

app.delete("/blogs/:id", async (req, res) => {

  try {

    await Blog.findByIdAndDelete(
      req.params.id
    );





    res.json({
      message: "Blog deleted",
    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error",
    });

  }

});


/* SERVER */



const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});