"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("posts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            slug: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.TEXT
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: "CASCADE",
                references: {
                    model: { tableName: "categories" },
                    key: "id",
                    as: "category_id"
                }
            },
            views: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("posts");
    }
};
