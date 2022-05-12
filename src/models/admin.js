const { fetch } = require("./");

const GET_ADMIN = `
SELECT *
FROM admins
WHERE username = $1
`;

exports.getAdmin = (username) => fetch(GET_ADMIN, [username]);
