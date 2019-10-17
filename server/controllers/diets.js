var express = require('express');
var router = express.Router();
var Diet = require('../models/Diet');

// Create a new diet - created for MS1 when 6 entities were needed
router.post('/', (req, res, next) => {
    var diet = new Diet(req.body);
    diet.save((err) => {
        if(err){
            return next(err);
        }
        res.status(201).json(diet);
    });
});

// Return a list of all diets - created for MS1 when 6 entities were needed
router.get('/', (req, res, next) => {
    var sortBy = req.query.sortBy || 'name';
    var orderBy = req.query.orderBy || 'asc'
    var sortQuery = {
        // Dynamic key - sortBy is the key in the object orderBy is the value 
        [sortBy]: orderBy
    }
    Diet.find()
    .sort(sortQuery)
    .exec((err, diets) => {
        if(err){
            return next(err);
        }
        res.json({'diets': diets})
    });
});


// Return the diet with the given ID
router.get('/:diet_id', (req, res, next) => {
    var id = req.params.diet_id;
    Diet.findById(id, (err, diet) => {
        if(err){
            return next(err);
        }
        if(diet === null){
            return res.status(404).json({'message': 'Diet not found'});
        }
        res.json(diet);
    });
});

// Partially update diet with the given ID - created for MS1 when 6 entities were needed
router.patch('/:diet_id', (req, res, next) => {
    var id = req.params.diet_id;
    Diet.findById(id, (err, diet) => {
        if (err){
            return next(err);
        }
        if (diet === null){
            return res.status(404).json({'message': 'Diet not found'});
        }
        diet.calories = (req.body.calories || diet.calories);
        diet.protein = (req.body.protein || diet.protein);
        diet.carbs = (req.body.carbs || diet.carbs);
        diet.fat = (req.body.fat || diet.fat);
        diet.save();
        res.json(diet);
    });
});

// Update diet with the given ID
router.put('/:diet_id', (req, res, next) => {
    var id = req.params.diet_id;
    Diet.findById(id, (err, diet) => {
        if (err){
            return next(err);
        }
        if (diet === null){
            return res.status(404).json({'message': 'Diet not found'});
        }
        diet.calories = req.body.calories;
        diet.protein = req.body.protein;
        diet.carbs = req.body.carbs;
        diet.fat = req.body.fat;
        diet.save();
        res.json(diet);
    });
});

// Delete diet with the given ID - created for MS1 when 6 entities were needed
router.delete('/:diet_id', (req, res, next) => {
    var id = req.params.diet_id;
    Diet.findOneAndDelete({_id: id}, (err, diet) => {
        if(err){
            return next(err);
        }
        if(diet === null){
            return res.status(404).json({'message': 'Diet not found'});
        }
        res.json(diet);
    });
});

module.exports = router;