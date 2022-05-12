const router = require("express").Router();
const controller = require("../../controllers/authController");
const validation = require("../../middlewares/validation");
const { loginSchema } = require("../../lib/validationSchema");

router.post("/login", validation(loginSchema, "/admin/login"), controller.login);
router.get("/login", controller.loginPage);
router.get("/logout", controller.logout);

module.exports = router;
