const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product,
    });

    res.json(categories)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }

  console.log(req.params, req.body, res.body)
});

router.get('/:id', async (req, res) => {
  try {

  } catch (err) {

  }
});

router.post('/', async (req, res) => {
  try {

  } catch (err) {

  }
});

router.put('/:id', async (req, res) => {
  try {

  } catch (err) {

  }
});

router.delete('/:id', async (req, res) => {
  try {

  } catch (err) {

  }
});

module.exports = router;
