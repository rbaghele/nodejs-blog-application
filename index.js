const morgan = require("morgan");
const express = require("express");
const expressEdge = require("express-edge");
const edge = require("edge.js");

const bodyParse = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");

// const usersController = require("./controllers/usersController");
// const postsController = require("./controllers/postsController");
// const sessionController = require("./controllers/sessionController");
// const auth = require("./middleware/auth");

const app = express();

// Middleware
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

// Middleware
const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

app.use("/", postRouter);
app.use("/", userRouter);
app.use("/", authRouter);
// app.get("/", postsController.getAllPost);
// app.get("/posts/new", auth, postsController.newPost);
// app.post("/posts/store", postsController.createPost);
// app.get("/posts/:id", postsController.getPost);

// app.get("/auth/register", redirectIfAuthenticated, usersController.newUser);
// app.post(
//   "/users/register",
//   redirectIfAuthenticated,
//   usersController.createUser
// );

// app.get("/auth/login", redirectIfAuthenticated, sessionController.newLogin);
// app.post(
//   "/users/login",
//   redirectIfAuthenticated,
//   sessionController.createSession
// );
// app.get("/auth/logout", sessionController.destorySession);

module.exports = app;
