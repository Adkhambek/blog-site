const app = require("./app");
const { fetch, fetchAll } = require("./models");
const { PORT } = require("./configs/keys");

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
