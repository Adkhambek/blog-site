require("dotenv").config();
module.exports = {
    PORT: Number(process.env.PORT),
    auth: {
        username: process.env.AUTH_USERNAME,
        password: process.env.AUTH_PASSWORD
    },
    sessionOpt: {
        secret: process.env.SECRET_KEY,
        saveUninitialized: true,
        resave: true
    },
    imageMaxSize: Number(process.env.IMAGE_MAX_SIZE),
    postLimit: Number(process.env.POST_LIMIT)
};
