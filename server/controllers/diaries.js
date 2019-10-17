var express = require('express');
var router = express.Router();
var Diary = require('../models/Diary');
var Meal = require('../models/Meal');

// Return the diary with the given ID
router.get('/:diary_id', (req, res, next) => {
    var id = req.params.diary_id;
    Diary.findById(id, (err, diary) => {
        if(err){
            return next(err);
        }
        if(diary === null){
            return res.status(404).json({'message': 'Diary not found'});
        }
        res.json(diary);
    });
});

// Create a new meal with diary ID
router.post('/:diary_id/meals', (req, res, next) => {
    var id = req.params.diary_id;
    var meal = new Meal(req.body);
    Diary.findById(id, (err, foundDiary) => {
        if(err){
            return next(err);
        }
        if(foundDiary === null){
            return res.status(404).json({'message': 'Diary not found'});
        }
        meal.diary = foundDiary;
        meal.save((err, savedMeal) => {
        if(err){
            return next(err);
        }
        foundDiary.meals.push(savedMeal._id);
        foundDiary.save();
        res.status(201).json(meal);
        });
    });
});

// Return all meals for a diary
router.get('/:diary_id/meals', (req, res, next) => {
    var id = req.params.diary_id;
    var filter = req.query.filter || ''
    var filterQuery = {
        date: new RegExp(filter, 'i')
    }
    Diary.findById(id, (err, diary) => {
        if(err){
            return next(err);
        }
        if (diary === null){
            return res.status(404).json({'message' : 'Diary not found'});
        }
        Meal.find(filterQuery).where({'diary': id}).exec((err, foundMeals) => {
            if(err){
                return next(err);
            }
            if(foundMeals === null){
                return res.status(404).json({'message' : 'Meals not found'});
            }
            res.json({'meals': foundMeals});
        });
    });
});

module.exports = router;