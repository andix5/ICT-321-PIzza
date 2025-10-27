/**
 * @openapi
 * /api/pizzas:
 *   get:
 *     summary: Retrieve a list of pizzas
 *     responses:
 *       200:
 *         description: A list of pizzas
 *   post:
 *     summary: Create a new pizza
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: src created
 *       400:
 *         description: Invalid input
 *
 * /api/pizzas/{id}:
 *   get:
 *     summary: Get a pizza by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single pizza
 *       404:
 *         description: src not found
 *   put:
 *     summary: Update a pizza by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: src updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: src not found
 *   delete:
 *     summary: Delete a pizza by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: src deleted
 *       404:
 *         description: src not found
 */



const express = require('express');
const { body, param } = require('express-validator');
const pizzaController = require('../controllers/pizzaController');

const router = express.Router();

const createAndUpdateValidations = [
    body('title').isString().notEmpty().withMessage('title is required'),
    body('image').optional().isString(),
    body('ingredients').optional().isString(),
    body('price').isFloat({ gt: 0 }).withMessage('price must be positive')
];

router.get('/', pizzaController.findAll);
router.post('/', createAndUpdateValidations, pizzaController.create);
router.get('/:id', [param('id').isInt().withMessage('id must be integer')], pizzaController.findOne);
router.put('/:id', [param('id').isInt(), ...createAndUpdateValidations], pizzaController.update);
router.delete('/:id', [param('id').isInt()], pizzaController.delete);

module.exports = router;
