const postModel = require("../models/post");
const categoryModel = require("../models/category");
const { imageUpload, deleteImage, slugify } = require("../lib/helpers");
const { homePage } = require("../configs/siteInfo");
const { truncate } = require("../lib/helpers");

exports.addPost = async (req, res) => {
    try {
        if (req.multerError) {
            req.flash("error", req.multerError);
            return res.redirect("posts/new");
        }
        const image = imageUpload(req.file);
        req.body.slug = slugify(req.body.title);
        const { id } = await postModel.createPost(req.body, image);
        req.flash("success", `New post (id: ${id}) was added successfully`);
        res.redirect("posts/new");
    } catch (error) {
        req.flash("error", "Something wrong");
        res.redirect("posts/new");
    }
};

exports.updatePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        let image = (await postModel.postById(id)).image;
        if (req.multerError) {
            req.flash("error", req.multerError);
            return res.redirect(`/admin/posts/edit/${id}`);
        }
        if (req.file) {
            deleteImage(image);
            image = imageUpload(req.file);
        }
        req.body.slug = slugify(req.body.title);
        await postModel.updatePost(id, req.body, image);
        req.flash("success", `The post (id: ${id}) was updated successfully`);
        res.redirect(`/admin/posts/edit/${id}`);
    } catch (error) {
        const id = Number(req.params.id);
        req.flash("error", "Something wrong");
        res.redirect(`/admin/posts/edit/${id}`);
    }
};

exports.deletePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const image = (await postModel.postById(id)).image;
        deleteImage(image);
        await postModel.deletePost(id);
        req.flash("success", `The post (id: ${id}) was deleted successfully`);
        res.redirect("/admin/posts");
    } catch (error) {
        console.log(error);
        req.flash("error", "Something wrong");
        res.redirect("/admin/posts");
    }
};

exports.addPostPage = async (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    const categories = await categoryModel.allCategories();
    res.render("admin/newPost", { categories, successMessage, errorMessage });
};

exports.updatePostPage = async (req, res) => {
    const id = Number(req.params.id);
    const post = await postModel.postById(id);
    const categories = await categoryModel.allCategories();
    const selectedCategory = await categoryModel.categoryById(post.category_id);
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin/editPost", { post, categories, selectedCategory, successMessage, errorMessage });
};

exports.postPage = async (req, res) => {
    const posts = await postModel.allPosts();
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin/posts", { posts, successMessage, errorMessage });
};

exports.singlePostPage = async (req, res) => {
    const { slug } = req.params;
    const post = await postModel.postBySlug(slug);
    if (post) {
        post.description = truncate(post.content, 150);
        const categories = await categoryModel.allCategories();
        res.render("public/post", { post, categories, homePage });
    } else {
        const categories = await categoryModel.allCategories();
        res.render("public/notFound", { homePage, categories });
    }
};
