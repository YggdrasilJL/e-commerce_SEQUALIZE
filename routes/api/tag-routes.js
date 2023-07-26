const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: {
        model: Product,
        through: ProductTag,
      },
    });
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot find tags.", error: err });
  }
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        through: ProductTag,
      },
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: "Cannot find tag.", error: err });
  }
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: "Cannot create tag.", error: err });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const tag_id = req.params.id;
  try {
    await Tag.update(req.body, {
      where: {
        id: tag_id,
      },
    });
    if (!tag_id) {
      return res.status(404).json({ message: "Cannot find tag.", error: err });
    }
    res.status(200).json({ message: "Tag updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot update tag.", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(500).json({ message: "Cannot find tag.", error: err });
    }
    await tag.destroy();
    res.json("Tag successfully deleted.");
  } catch (err) {
    res.status(500).json({ message: "Cannot delete tag.", error: err });
  }
});

module.exports = router;
