const path = require("path");
const morgan = require("morgan");
const express = require("express");
const expressEdge = require("express-edge");
const edge = require("edge.js");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");

// const createPostController = require("./controllers/createPost");
// const homePageController = require("./controllers/homePage");
// const storePostController = require("./controllers/storePost");
// const getPostController = require("./controllers/getPost");
// const createUserController = require("./controllers/createUser");
// const storeUserController = require("./controllers/storeUser");
// const loginController = require("./controllers/login");
// const loginUserController = require("./controllers/loginUser");
// const logoutController = require("./controllers/logout");

const usersController = require("./controllers/usersController");
const postsController = require("./controllers/postsController");
const sessionController = require("./controllers/sessionController");
const auth = require("./middleware/auth");

const app = express();

mongoose
  .connect(
    "mongodb+srv://rbaghele:N9960372626n@apt-nodejs-cluster01.bqmfa.mongodb.net/node-learning?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected."))
  .catch((err) => {
    console.log(err);
  });

// const mongoStore = new connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    store: new connectMongo({
      mongoUrl:
        "mongodb+srv://rbaghele:N9960372626n@apt-nodejs-cluster01.bqmfa.mongodb.net/node-learning?retryWrites=true&w=majority",
    }),
  })
);
app.use(fileUpload());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(expressEdge.engine);
app.use(bodyParse.json());
app.use(connectFlash());
app.use(
  bodyParse.urlencoded({
    extended: true,
  })
);
app.set("views", __dirname + "/views");

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

const storePost = require("./middleware/storePost");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

app.use("/posts/store", storePost);

app.get("/", postsController.getAllPost);
app.get("/posts/new", auth, postsController.newPost);
app.post("/posts/store", postsController.createPost);
app.get("/posts/:id", postsController.getPost);

app.get("/auth/register", redirectIfAuthenticated, usersController.newUser);
app.post(
  "/users/register",
  redirectIfAuthenticated,
  usersController.createUser
);
app.get("/auth/login", redirectIfAuthenticated, sessionController.newLogin);
app.post(
  "/users/login",
  redirectIfAuthenticated,
  sessionController.createSession
);
app.get("/auth/logout", sessionController.destorySession);

// app.get("/", async (req, res) => {
//   const posts = await Post.find({});
//   // res.sendFile(path.resolve(__dirname, "pages/index.html"));
//   res.render("index", {
//     posts,
//   });
// });

// app.get("/index", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "pages/index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "pages/about.html"));
// });

// app.get("/contact", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "pages/contact.html"));
// });

// app.get("/post", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "pages/post.html"));
// });

// app.get("/posts/new", (req, res) => {
//   // res.sendFile(path.resolve(__dirname, "pages/index.html"));
//   res.render("create");
// });

// app.post("/posts/store", (req, res) => {
//   console.log("===================");
//   console.log(req.body);
//   console.log("===================");
//   console.log(req.files);
//   console.log("===================");
//   const { image } = req.files;

//   image.mv(path.resolve(__dirname, "public/posts", image.name), (error) => {
//     Post.create(
//       {
//         ...req.body,
//         image: `/posts/${image.name}`,
//       },
//       (error, post) => {
//         res.redirect("/");
//       }
//     );
//   });
// });

// app.get("/posts/:id", async (req, res) => {
//   const post = await Post.findById(req.params.id);

//   res.render("post", {
//     post,
//   });
// });

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
