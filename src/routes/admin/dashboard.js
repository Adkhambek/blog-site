const router = require("express").Router();
const controller = require("../../controllers/dashboardController");

router.get("/", controller.dashboardPage);

module.exports = router;
