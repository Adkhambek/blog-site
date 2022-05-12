module.exports = (req, res, next) => {
    if (!req.session.admin) {
        req.flash("error", "You are not logged in");
        return res.redirect("/admin/login");
    }
    return next();
};
