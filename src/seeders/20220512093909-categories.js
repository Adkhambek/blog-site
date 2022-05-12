module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "categories",
            [
                {
                    name: "javascript",
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: "typescript",
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: "nodejs",
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: "errors",
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    name: "other",
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("categories", null, {});
    }
};
