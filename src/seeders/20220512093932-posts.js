module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "posts",
            [
                {
                    title: "This is my first blog post ever",
                    slug: "this-is-my-first-blog-post-ever",
                    image: "image.png",
                    content: `<p>Hello, My name is Adham. This is my first blog post. I am very happy to share all of my knowledge to all of you. Let's do it</p><p>Score success ...</p>`,
                    category_id: 1,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("posts", null, {});
    }
};
