var express = require('express');
var router = express.Router();
var Meal = require('../models/Meal');
var Account = require('../models/Account')

// Return the meal with the given ID
router.get('/:meal_id', (req, res, next) => {
    var id = req.params.meal_id;
    Meal.findById(id, (err, meal) => {
        if(err){
            return next(err);
        }
        if(meal === null){
            return res.status(404).json({'message': 'Meal not found'});
        }
        res.json(meal);
    });
});

// Delete meal with the given ID
router.delete('/:meal_id', (req, res, next) => {
    var id = req.params.meal_id;
    Meal.findOneAndDelete({_id: id}, (err, meal) => {
        if(err){
            return next(err);
        }
        if(meal === null){
            return res.status(404).json({'message': 'Meal not found'});
        }
        Account.updateOne({meals: id}, {'$pull': {meals: id}}, (req, res, next) => {
            if(err){
                return next(err);
            }
        })
        res.json(meal);
    });
});


module.exports = router;