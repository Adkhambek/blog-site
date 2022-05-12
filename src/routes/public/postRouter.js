const router = require("express").Router();
const controller = require("../../controllers/postController");

router.get("/:slug", controller.singlePostPage);

module.exports = router;
