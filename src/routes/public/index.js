const router = require("express").Router();
const visits = require("../../middlewares/visits");
const homeRouter = require("./homeRouter");
const postRouter = require("./postRouter");

router.use("/", visits, homeRouter);
router.use("/posts", visits, postRouter);

module.exports = router;
