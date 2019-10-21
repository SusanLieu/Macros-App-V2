var express = require('express');
var router = express.Router();
var Ingredient = require('../models/Ingredient');

// Created for MS1 when 6 entities were needed

// Create a new ingredient
router.post('/', (req, res, next) => {
    var ingredient = new Ingredient(req.body);
    ingredient.save((err) => {
        if(err){
            return next(err);
        }
        res.status(201).json(ingredient);
    });
});

// Return all ingredients
router.get('/', (req, res, next) => {
    Ingredient.find((err, ingredients) => {
        if(err){
            return next(err);
        }
        res.json({'ingredients': ingredients});
    });
});

// Return ingredient with the given ID
router.get('/:ingredient_id', (req, res, next) => {
    var id = req.params.ingredient_id;
    Ingredient.findById(id, (err, ingredient) => {
        if(err){
            return next(err);
        }
        if(ingredient === null){
            return res.status(404).json({'message' : 'Ingredient not found'});
        }
        res.json(ingredient);
    });
});

// Partially update ingredient with the given ID
router.patch('/:ingredient_id', (req, res, next) => {
    var id = req.params.ingredient_id;
    Ingredient.findById(id, (err, ingredient) => {
        if (err){
            return next(err);
        }
        if (ingredient === null){
            return res.status(404).json({'message': 'Ingredient not found'});
        }
        ingredient.name = (req.body.name || ingredient.name);
        ingredient.calories = (req.body.calories || ingredient.calories);
        ingredient.fat = (req.body.fat || ingredient.fat);
        ingredient.carbs = (req.body.carbs || ingredient.carbs);
        ingredient.protein = (req.body.protein || ingredient.protein);
        ingredient.save();
        res.json(ingredient);
    });
});

// Delete ingredient with the given ID
router.delete('/:ingredient_id', (req, res, next) => {
    var id = req.params.ingredient_id;
    Ingredient.findOneAndDelete({_id: id}, (err, ingredient) => {
        if(err){
            return next(err);
        }
        if(ingredient === null){
            return res.status(404).json({'message': 'ingredient not found'});
        }
        res.json(ingredient);
    });
});

module.exports = router;