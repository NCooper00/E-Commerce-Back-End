const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const returnedCategoryData = await Category.findAll({
      include: [{ model: Product,
        attributes: ['product_name', 'price', 'stock'],
      }]
    });
    res.status(200).json(returnedCategoryData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const returnedCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product,
        attributes: ['product_name', 'price', 'stock'],
      }]
    });

    if (!returnedCategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(returnedCategoryData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const returnedCategoryData = await Category.create(req.body);
    res.status(200).json(returnedCategoryData);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const returnedCategoryData = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (!returnedCategoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(returnedCategoryData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const returnedCategoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!returnedCategoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(returnedCategoryData);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
