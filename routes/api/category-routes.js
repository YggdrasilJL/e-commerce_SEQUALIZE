const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product,
    });

    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }

});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });
    !category
      ? res.status(404).json({ message: "Oops! Category not found." })
      : res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create category
router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    // did an if statement instead of ternary op because ternary op's dont work with await
    if (!category) {
      return res.status(404).json({ message: "Oops! Category not found." });
    }
    await category.update(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Oops! Category not found." });
    }
    await category.destroy(req.body);
    res.json({ message: "Category deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
