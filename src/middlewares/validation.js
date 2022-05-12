module.exports = (schema, redirectUrl) => {
    return (req, res, next) => {
        const id = Number(req.params.id);
        const { error } = schema.validate(req.body);
        if (error) {
            req.flash("error", error.details[0].message);
            if (id) return res.redirect(`${redirectUrl}/${id}`);
            return res.redirect(redirectUrl);
        } else {
            return next();
        }
    };
};
