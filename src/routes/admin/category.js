const router = require("express").Router();
const controller = require("../../controllers/categoryController");
const validation = require("../../middlewares/validation");
const { categorySchema } = require("../../lib/validationSchema");

router.post("/", validation(categorySchema, "categories/new"), controller.addCategory);
router.get("/new", controller.addCategoryPage);
router.get("/", controller.categoryPage);
router.get("/edit/:id", controller.updateCategoryPage);
router.get("/delete/:id", controller.deleteCategory);
router.post("/edit/:id", validation(categorySchema, `/admin/categories/edit`), controller.updateCategory);

module.exports = router;
