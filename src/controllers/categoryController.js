const model = require("../models/category");

exports.addCategory = async (req, res) => {
    try {
        const { name } = await model.createCategory(req.body.name);
        req.flash("success", `New category (name: ${name}) was added successfully`);
        res.redirect("categories/new");
    } catch (error) {
        req.flash("error", "Something wrong");
        res.redirect("categories/new");
    }
};

exports.addCategoryPage = (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin/newCategory", { successMessage, errorMessage });
};

exports.updateCategory = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await model.updateCategories(id, req.body.name);
        req.flash("success", `The category (id: ${id}) was updated successfully`);
        res.redirect(`/admin/categories/edit/${id}`);
    } catch (error) {
        req.flash("error", "Something wrong");
        res.redirect(`/admin/categories/edit/${id}`);
    }
};

exports.updateCategoryPage = async (req, res) => {
    const id = Number(req.params.id);
    const category = await model.categoryById(id);
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin/editCategory", { category, successMessage, errorMessage });
};

exports.deleteCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await model.deleteCategories(id);
        req.flash("success", `The category (id: ${id}) was deleted successfully`);
        res.redirect(`/admin/categories`);
    } catch (error) {
        req.flash("error", "Something wrong");
        res.redirect(`/admin/categories`);
    }
};

exports.categoryPage = async (req, res) => {
    const categories = await model.allCategories();
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin/categories", { categories, successMessage, errorMessage });
};
