const router = require("express").Router();
const controller = require("../../controllers/postController");
const validation = require("../../middlewares/validation");
const { postSchema } = require("../../lib/validationSchema");
const multer = require("../../middlewares/multer");

router.post("/", multer, validation(postSchema, "/admin/posts/new"), controller.addPost);
router.get("/new", controller.addPostPage);
router.get("/", controller.postPage);
router.get("/edit/:id", controller.updatePostPage);
router.get("/delete/:id", controller.deletePost);
router.post("/edit/:id", multer, validation(postSchema, "/admin/posts/edit"), controller.updatePost);

module.exports = router;
