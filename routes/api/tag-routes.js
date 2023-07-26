const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include:
        {
          model: Product,
          through: ProductTag,
        },
    });
    res.json(tags)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Cannot find tags.', error: err })
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include:
        {
          model: Product,
          through: ProductTag,
        },
    })
    res.json(tags)
  } catch (err) {
    res.status(500).json({ message: 'Cannot find tag.', error: err })
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body)
    res.json(tag)
  } catch (err) {
    res.status(500).json({ message: 'Cannot create tag.', error: err })

  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Cannot update tag.', error: err });

  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(500).json({ message: 'Cannot find tag.', error: err });
    }
    await tag.destroy(req.body);
    res.json('Tag successfully deleted.')
  } catch (err) {
    res.status(500).json({ message: 'Cannot delete tag.', error: err })
  }
});

module.exports = router;
