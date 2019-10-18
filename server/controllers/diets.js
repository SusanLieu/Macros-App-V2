var express = require('express');
var router = express.Router();
var Diet = require('../models/Diet');

// Create a new diet
router.post('/', (req, res, next) => {
    var diet = new Diet(req.body);
    diet.save((err) => {
        if(err){
            return next(err);
        }
        res.status(201).json(diet);
    });
});

// Return a list of all diets
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

// Delete diet with the given ID
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