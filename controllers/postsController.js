const path = require("path");
const Post = require("../database/models/Post");

const newPost = (req, res) => {
  if (req.session.userId) {
    return res.render("create");
  }

  res.redirect("/auth/login");
};

const createPost = (req, res) => {
  const { image } = req.files;

  image.mv(
    path.resolve(__dirname, "..", "public/posts", image.name),
    (error) => {
      Post.create(
        {
          ...req.body,
          image: `/posts/${image.name}`,
        },
        (error, post) => {
          res.redirect("/");
        }
      );
    }
  );
};

const getAllPost = async (req, res) => {
  const posts = await Post.find({});

  res.render("index", {
    posts,
  });
};

const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post,
  });
};

module.exports = {
  newPost,
  createPost,
  getAllPost,
  getPost,
};
