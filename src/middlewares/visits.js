const model = require("../models/post");

module.exports = async (req, res, next) => {
    const [, page, subPage] = req.originalUrl.split("/");
    if (page === "posts" && !req.session.admin) {
        await model.updateViews(subPage);
        return next();
    }
    return next();
};
