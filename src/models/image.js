const { fetch, fetchAll } = require("./");
const date = new Date();

const CREATE_IMAGE = `
INSERT INTO 
images(image, title, created_at, updated_at) 
VALUES($1, $2, $3, $4)
RETURNING id, image, title`;

const ALL_IMAGES = `
SELECT id, image, title FROM images
ORDER BY id DESC
`;

const IMAGE_BY_ID = `
SELECT id, image, title FROM images 
WHERE id = $1
ORDER BY id DESC
`;
const UPDATE_IMAGE = `
UPDATE images
SET image = $1, title =$2,  updated_at = $3
WHERE id = $4
RETURNING id, title
`;

const DELETE_IMAGE = `
DELETE FROM images WHERE id = $1
`;

exports.createImage = (image, title) => fetch(CREATE_IMAGE, [image, title, date, date]);
exports.allImages = () => fetchAll(ALL_IMAGES);
exports.imageById = (id) => fetch(IMAGE_BY_ID, [id]);
exports.updateImage = (id, image, title) => fetch(UPDATE_IMAGE, [image, title, date, id]);
exports.deleteImage = (id) => fetch(DELETE_IMAGE, [id]);
