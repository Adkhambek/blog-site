const model = require("../models/image");
const { imageUpload, deleteImage } = require("../lib/helpers");

exports.addImage = async (req, res) => {
    try {
        if (req.multerError) {
            req.flash("error", req.multerError);
            return res.redirect("images/new");
        }
        const image = imageUpload(req.file);
        const { id } = await model.createImage(image, req.body.title);
        req.flash("success", `New category (id: ${id}) was added successfully`);
        res.redirect("images/new");
    } catch (error) {
        req.flash("error", "Something wrong");
        res.redirect("images/new");
    }
};

exports.updateImage = async (req, res) => {
    try {
        const id = Number(req.params.id);
        let image = (await model.imageById(id)).image;
        if (req.multerError) {
            req.flash("error", req.multerError);
            return res.redirect(`/admin/images/edit/${id}`);
        }
        if (req.file) {
            deleteImage(image);
            image = imageUpload(req.file);
        }
        await model.updateImage(id, image, req.body.title);
        req.flash("success", `The image (id: ${id}) was updated successfully`);
        res.redirect(`/admin/images/edit/${id}`);
    } catch (error) {
        const id = Number(req.params.id);
        req.flash("error", "Something wrong");
        res.redirect(`/admin/images/edit/${id}`);
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const image = (await model.imageById(id)).image;
        deleteImage(image);
        await model.deleteImage(id);
        req.flash("success", `The image (id: ${id}) was deleted successfully`);
        res.redirect(`/admin/images`);
    } catch (error) {
        console.log(error);
        req.flash("error", "Something wrong");
        res.redirect(`/admin/images`);
    }
};

exports.addImagePage = (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin/newImage", { successMessage, errorMessage });
};

exports.updateImagePage = async (req, res) => {
    const id = Number(req.params.id);
    const image = await model.imageById(id);
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin/editImage", { image, successMessage, errorMessage });
};

exports.imagePage = async (req, res) => {
    const images = await model.allImages();
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin/images", { images, successMessage, errorMessage });
};
