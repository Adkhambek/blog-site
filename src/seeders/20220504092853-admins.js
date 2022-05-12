const { hashPassword } = require("../lib/helpers");
const {
    auth: { username, password }
} = require("../configs/keys");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "admins",
            [
                {
                    username,
                    password: hashPassword(password),
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("admins", null, {});
    }
};
