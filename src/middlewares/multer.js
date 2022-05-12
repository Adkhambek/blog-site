const multer = require("multer");
const { imageMaxSize } = require("../configs/keys");

module.exports = (req, res, next) => {
    return multer({
        storage: multer.memoryStorage(),
        fileFilter: (req, file, cb) => {
            if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                cb(null, true);
            } else {
                req.fileFormatError = true;
                return cb(null, false);
            }
        },
        limits: {
            fileSize: 1024 * 1024 * imageMaxSize
        }
    }).single("image")(req, res, (err) => {
        if (err && err.code === "LIMIT_FILE_SIZE") {
            req.multerError = "File size should not be greater than 3 MB";
            return next();
        }
        if (req.fileFormatError) {
            req.multerError = "Only .png, .jpg and .jpeg format allowed!";
            return next();
        }
        if (!req.file) {
            if (req.params.id) return next();
            req.multerError = "File is required";
            return next();
        }
        return next();
    });
};
