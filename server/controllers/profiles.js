var express = require('express');
var router = express.Router();
var Profile = require('../models/Profile');

// Return a list of all profiles
router.get('/', (req, res, next) => {
    Profile.find((err, profiles) => {
        if(err){
            return next(err);
        }
        res.json({'profiles': profiles});
    });
}); 

// Delete all profiles
router.delete('/', (req, res, next) => {
    Profile.deleteMany((err, profiles) => {
        if(err){
            return next(err);
        }
        res.json(profiles);
    });
});

// Return the profile with the given ID
router.get('/:profile_id', (req, res, next) => {
    var id = req.params.profile_id;
    Profile.findById(id).populate('account').exec((err, profile) => {
        if(err){
            return next(err);
        }
        if(profile === null){
            return res.status(404).json({'message': 'Profile not found'});
        }
        res.json(profile);
    });
});

// Update profile with the given ID
router.put('/:profile_id', (req, res, next) => {
    var id = req.params.profile_id;
    Profile.findById(id, (err, profile) => {
        if(err){
            return next(err);
        }
        if(profile === null){
            return res.status(404).json({'message': 'Profile not found'});
        }
        profile.age = req.body.age;
        profile.height = req.body.height;
        profile.weight = req.body.height;
        profile.gender = req.body.gender;
        profile.activityLevel = req.body.activityLevel;
        profile.account = profile.account;
        profile.save();
        res.json(profile);
    });
});

// Partially update profile with the given ID
router.patch('/:profile_id', (req, res, next) => {
    var id = req.body.profile_id;
    Profile.findById(id, (err, profile) => {
        if(err){
            return next(err);
        }
        if(profile === null){
            return res.status(404).json({'message': 'Profile not found'});
        }
        profile.age = (req.body.age || profile.age);
        profile.height = (req.body.height || profile.height);
        profile.weight = (req.body.height || profile.weight);
        profile.gender = (req.body.gender || profile.gender);
        profile.activityLevel = (req.body.activityLevel || profile.activityLevel);
        profile.account = (req.body.account || profile.account);
        profile.save();
        res.json(profile);
    });
});

// Delete the profile with the given ID
router.delete('/:profile_id', (req, res, next) => {
    var id = req.params.profile_id;
    Profile.findOneAndDelete({_id: id}, (err, profile) => {
        if(err){
            return next(err);
        }
        if(profile === null){
            return res.status(404).json({'message': 'Profile not found'});
        }
        res.json(profile);
    });
});
  
module.exports = router;