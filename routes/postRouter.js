const express = require("express");
const postsController = require("./../controllers/postsController");
const auth = require("./../middleware/auth");
const storePost = require("./../middleware/storePost");

const router = express.Router();

router.use("/posts/store", storePost);
router.get("/", postsController.getAllPost);
router.get("/posts", postsController.getAllPost);
router.get("/posts/new", auth, postsController.newPost);
router.post("/posts/store", postsController.createPost);
router.get("/posts/:id", postsController.getPost);
// router.put("/posts/:id", postsController.updatePost);

module.exports = router;
