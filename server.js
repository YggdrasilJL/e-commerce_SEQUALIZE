require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
// coloring terminal package
const chalk = require("chalk");
const cyan = chalk.cyan;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// cool terminal graphic when initalizing server
console.log(
  cyan(`
  ███████╗     ██████╗ ██████╗ ███╗   ███╗    ██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗
  ██╔════╝    ██╔════╝██╔═══██╗████╗ ████║    ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
  █████╗█████╗██║     ██║   ██║██╔████╔██║    ██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗  
  ██╔══╝╚════╝██║     ██║   ██║██║╚██╔╝██║    ██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝  
  ███████╗    ╚██████╗╚██████╔╝██║ ╚═╝ ██║    ██████╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗
  ╚══════╝     ╚═════╝ ╚═════╝ ╚═╝     ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝

`)
);

// sync sequelize models to the database force true to recreate tables on every sync, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(cyan(`listening at ${PORT}`)));
});
