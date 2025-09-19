/**
 * @openapi
 * /api/ingredients:
 *   get:
 *     summary: Retrieve all ingredients
 *     responses:
 *       200:
 *         description: A list of ingredients
 *   post:
 *     summary: Create a new ingredient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Ingredient created
 *       400:
 *         description: Invalid input
 *
 * /api/ingredients/{id}:
 *   get:
 *     summary: Get an ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single ingredient
 *       404:
 *         description: Ingredient not found
 *   put:
 *     summary: Update an ingredient by ID
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ingredient updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Ingredient not found
 *   delete:
 *     summary: Delete an ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ingredient deleted
 *       404:
 *         description: Ingredient not found
 */


const express = require('express');
const { body, param } = require('express-validator');
const ingredientController = require('../ingredientController');


const router = express.Router();

const createAndUpdateValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('price must be a positive number'),
];

router.get('/', ingredientController.findAll);
router.post('/', createAndUpdateValidations, ingredientController.create);
router.get('/:id', [param('id').isInt().withMessage('id must be an integer')], ingredientController.findOne);
router.put('/:id', [param('id').isInt().withMessage('id must be an integer'), ...createAndUpdateValidations], ingredientController.update);
router.delete('/:id', [param('id').isInt().withMessage('id must be an integer')], ingredientController.delete);

module.exports = router;
