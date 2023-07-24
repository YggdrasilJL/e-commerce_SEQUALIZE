require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')
// import models
const Category = require('./models/Category')
const Product = require('./models/Product')
const ProductTag = require('./models/ProductTag')
const Tag = require('./models/Tag')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database force true to recreate tables on every sync, then turn on the server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`listening at ${PORT}`));
});
