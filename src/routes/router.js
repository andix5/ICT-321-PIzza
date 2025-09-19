const express = require('express');
const pizzasRouter = require('../pizza/routes/pizzas');
const ingredientsRouter = require('../ingredient/routes/ingredients');

const router = express.Router();

router.use('/pizzas', pizzasRouter);
router.use('/ingredients', ingredientsRouter);

module.exports = router;
