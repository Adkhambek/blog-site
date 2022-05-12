const router = require("express").Router();
const controller = require("../../controllers/homeController");

router.get("/", controller.homePage);
router.get("/page/:page", controller.pages);
router.get("/category/:name", controller.categoryPage);
router.get("/search", controller.searchPage);

module.exports = router;
