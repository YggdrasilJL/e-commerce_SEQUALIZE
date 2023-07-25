require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database force true to recreate tables on every sync, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`listening at ${PORT}`));
});
