const model = require("../models/admin");
const { checkPassword } = require("../lib/helpers");

exports.login = async (req, res) => {
    const admin = await model.getAdmin(req.body.username);
    if (!admin) {
        req.flash("error", "Username is incorrenct");
        return res.redirect("login");
    }
    if (!checkPassword(req.body.password, admin.password)) {
        req.flash("error", "Password is incorrenct");
        return res.redirect("login");
    }
    req.session.admin = true;
    req.flash("success", "Welcome to dashboard");
    return res.redirect("/admin/posts");
};

exports.logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/admin/login");
};

exports.loginPage = (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin/login", { successMessage, errorMessage });
};
