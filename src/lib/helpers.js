const bcrypt = require("bcryptjs");
const path = require("path");
const { writeFileSync, unlink } = require("fs");
const slugify = require("slugify");

exports.hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(6);
    return bcrypt.hashSync(password, salt);
};

exports.checkPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

exports.imageUpload = (file) => {
    const [name, extension] = file.originalname.split(".");
    const newFileName = `${name.split(" ").join("-")}-${Date.now()}.${extension}`;
    const filePath = path.join(process.cwd(), "src", "public/images", "post", newFileName);
    writeFileSync(filePath, file.buffer);
    return newFileName;
};

exports.deleteImage = (imageName) => {
    const filePath = path.join(process.cwd(), "src", "public/images", "post", imageName);
    return unlink(filePath, (err) => {
        if (err) console.log(err);
        return;
    });
};

exports.slugify = (url) => {
    return slugify(url, {
        remove: /[^a-zA-Z0-9 -]/,
        lower: true,
        strict: true
    });
};

exports.truncate = (content, size) => {
    const cleanContent = content.replace(/(<([^>]+)>)/gi, "");
    return cleanContent.length > size ? cleanContent.slice(0, size - 1) + "..." : cleanContent;
};
