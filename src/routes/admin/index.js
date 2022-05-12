const router = require("express").Router();
const protect = require("../../middlewares/auth");
const category = require("./category");
const image = require("./image");
const post = require("./post");
const dashboard = require("./dashboard");
const auth = require("./auth");

router.use("/", auth);
router.use("/categories", protect, category);
router.use("/images", protect, image);
router.use("/posts", protect, post);
router.use("/dashboard", protect, dashboard);

module.exports = router;
