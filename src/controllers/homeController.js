const postModel = require("../models/post");
const categoryModel = require("../models/category");
const { homePage } = require("../configs/siteInfo");
const { postLimit: limit } = require("../configs/keys");
const { truncate } = require("../lib/helpers");

exports.homePage = async (req, res) => {
    const categories = await categoryModel.allCategories();
    const currentPost = await postModel.currentPost();
    const popularPosts = await postModel.popularPosts();
    const mainPosts = await postModel.mainPosts(limit);
    const totalPosts = Number((await postModel.totalPosts()).count);
    const totalPages = Math.ceil(totalPosts / limit);
    currentPost.description = truncate(currentPost.content, 150);
    mainPosts.map((post) => (post.description = truncate(post.content, 150)));
    res.render("public/index", {
        page: "home",
        categories,
        homePage,
        currentPost,
        popularPosts,
        mainPosts,
        totalPages
    });
};

exports.pages = async (req, res) => {
    const categories = await categoryModel.allCategories();
    const currentPost = await postModel.currentPost();
    const popularPosts = await postModel.popularPosts();
    const pageNumber = Number(req.params.page);
    const totalPosts = Number((await postModel.totalPosts()).count);
    const totalPages = Math.floor(totalPosts / limit) + 1;
    const offset = (pageNumber - 1) * limit;
    if (pageNumber <= 0 || pageNumber > totalPages) {
        return res.render("public/notFound", { categories, homePage });
    }
    const posts = await postModel.page(offset, limit);
    posts.map((post) => (post.description = truncate(post.content, 150)));
    res.render("public/index", {
        page: "page",
        categories,
        currentPost,
        popularPosts,
        homePage,
        posts,
        totalPages,
        pageNumber
    });
};

exports.categoryPage = async (req, res) => {
    const categoryName = req.params.name;
    const posts = await postModel.postsByCategory(categoryName);
    const categories = await categoryModel.allCategories();
    if (!posts.length) {
        return res.render("public/notFound", { homePage, categories });
    }
    posts.map((post) => (post.description = truncate(post.content, 150)));
    res.render("public/index", {
        page: "category",
        categories,
        homePage,
        categoryName: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
        posts
    });
};

exports.searchPage = async (req, res) => {
    const { s } = req.query;
    const posts = await postModel.searchPosts(s);
    posts.map((post) => (post.description = truncate(post.content, 150)));
    const categories = await categoryModel.allCategories();
    if (!posts.length) {
        res.render("public/notFound", { categories, homePage });
    } else {
        res.render("public/index", {
            page: "search",
            categories,
            homePage,
            posts,
            title: s
        });
    }
};
