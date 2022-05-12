const router = require("express").Router();
const { homePage } = require("../configs/siteInfo");
const categoryModel = require("../models/category");
const publicRouter = require("./public");
const adminRouter = require("./admin");

router.use("/", publicRouter);
router.use("/admin", adminRouter);

router.use("/", async (req, res) => {
    const categories = await categoryModel.allCategories();
    res.render("public/notFound", { homePage, categories });
});

module.exports = router;
