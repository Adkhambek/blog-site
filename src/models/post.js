const { fetch, fetchAll } = require("./");
const date = new Date();

const CREATE_POST = `
INSERT INTO 
posts(title, slug, image, content, category_id, created_at, updated_at) 
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING id, title`;

const ALL_POSTS = `
SELECT p.id, slug, views, title, image, content, c.name as category
FROM posts p
JOIN categories c on p.category_id = c.id
ORDER BY id DESC
`;

const POSTS_BY_CATEGORY = `
SELECT * FROM posts p
JOIN categories c on p.category_id = c.id
WHERE c.name = $1
ORDER BY p.id DESC
`;

const TOTAL_POSTS = `
SELECT COUNT(*) as count
FROM posts
`;

const CURRENT_POST = `
SELECT * FROM posts
WHERE id = (
    SELECT MAX (id)
    FROM posts
)
`;

const POPULAR_POSTS = `
SELECT * FROM posts
ORDER BY views DESC
LIMIT 3
`;

const MAIN_POSTS = `
SELECT * FROM posts
ORDER BY id DESC
LIMIT $1
`;

const PAGE = `
SELECT * FROM posts
ORDER BY id DESC
OFFSET $1 LIMIT $2;
`;

const POST_BY_ID = `
SELECT * FROM posts 
WHERE id = $1
`;

const POST_BY_SLUG = `
SELECT * FROM posts 
WHERE slug = $1
`;

const UPDATE_POST = `
UPDATE posts
SET title = $1, slug = $2, image = $3, content = $4, category_id = $5,  updated_at = $6
WHERE id = $7
RETURNING id, title
`;

const UPDATE_VIEWS = `
UPDATE posts
SET views = views + 1
WHERE slug = $1
`;

const DELETE_POST = `
DELETE FROM posts WHERE id = $1
`;

const SEARCH_POSTS = `
SELECT * FROM posts
WHERE title ILIKE $1 OR content ILIKE $1
ORDER BY id DESC
`;

exports.createPost = (data, image) =>
    fetch(CREATE_POST, [data.title, data.slug, image, data.content, data.categoryId, date, date]);
exports.allPosts = () => fetchAll(ALL_POSTS);
exports.currentPost = () => fetch(CURRENT_POST);
exports.postById = (id) => fetch(POST_BY_ID, [id]);
exports.updatePost = (id, data, image) =>
    fetch(UPDATE_POST, [data.title, data.slug, image, data.content, data.categoryId, date, id]);
exports.deletePost = (id) => fetch(DELETE_POST, [id]);
exports.updateViews = (slug) => fetch(UPDATE_VIEWS, [slug]);
exports.popularPosts = () => fetchAll(POPULAR_POSTS);
exports.page = (offset, limit) => fetchAll(PAGE, [offset, limit]);
exports.totalPosts = () => fetch(TOTAL_POSTS);
exports.mainPosts = (limit) => fetchAll(MAIN_POSTS, [limit]);
exports.postsByCategory = (name) => fetchAll(POSTS_BY_CATEGORY, [name]);
exports.searchPosts = (s) => fetchAll(SEARCH_POSTS, [`%${s}%`]);
exports.postBySlug = (slug) => fetch(POST_BY_SLUG, [slug]);
