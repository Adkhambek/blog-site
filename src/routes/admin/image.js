const router = require("express").Router();
const controller = require("../../controllers/imageController");
const validation = require("../../middlewares/validation");
const { imageSchema } = require("../../lib/validationSchema");
const multer = require("../../middlewares/multer");

router.post("/", multer, validation(imageSchema, "images/new"), controller.addImage);
router.get("/new", controller.addImagePage);
router.get("/", controller.imagePage);
router.get("/edit/:id", controller.updateImagePage);
router.get("/delete/:id", controller.deleteImage);
router.post("/edit/:id", multer, validation(imageSchema, `/admin/images/edit`), controller.updateImage);

module.exports = router;
