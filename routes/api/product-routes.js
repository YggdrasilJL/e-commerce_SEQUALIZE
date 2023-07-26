const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  // find all products
  try {
    const products = await Product.findAll({
      // had to do the array of objects instead of just include: "[Category, ProductTag, Tag]" because it gave an error
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Cannot find products.", error: err });
    console.log(err);
  }
});

// get one product
router.get("/:id", async (req, res) => {
  // find a single product by its `id`
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Cannot find product.", error: err });
  }
});
// made the following routes async for readability
// create new product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Cannot create product.", error: err });
  }
});
// update product data and checks if there is an array at all
router.put("/:id", async (req, res) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => ({
          product_id: req.params.id,
          tag_id,
        }));

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    const product = await Product.findOne({ where: { id: req.params.id } });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Cannot update product.", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Oops! Product not found." });
    }
    await product.destroy(req.body);
    res.json({ message: "Product deleted." });
  } catch (err) {
    res.status(500).json({ message: "Cannot delete product.", error: err });
  }
});

module.exports = router;
