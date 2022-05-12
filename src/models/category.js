const { fetch, fetchAll } = require("./");
const date = new Date();

const CREATE_CATEGORY = `
INSERT INTO 
categories(name, created_at, updated_at) 
VALUES($1, $2, $3)
RETURNING id, name`;

const ALL_CATEGORIES = `
SELECT id, name FROM categories
ORDER BY id DESC
`;

const CATEGORY_BY_ID = `
SELECT id, name FROM categories 
WHERE id = $1
ORDER BY id DESC
`;
const UPDATE_CATEGORIES = `
UPDATE categories
SET name = $1, updated_at = $2
WHERE id = $3
RETURNING id, name
`;

const DELETE_CATEGORIES = `
DELETE FROM categories WHERE id = $1
`;

exports.createCategory = (name) => fetch(CREATE_CATEGORY, [name, date, date]);
exports.allCategories = () => fetchAll(ALL_CATEGORIES);
exports.categoryById = (id) => fetch(CATEGORY_BY_ID, [id]);
exports.updateCategories = (id, name) => fetch(UPDATE_CATEGORIES, [name, date, id]);
exports.deleteCategories = (id) => fetch(DELETE_CATEGORIES, [id]);
