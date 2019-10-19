var express = require('express');
var router = express.Router();
var Account = require('../models/Account');
var Profile = require('../models/Profile');
var Diet = require('../models/Diet');
var Meal = require('../models/Meal');

// Create a new account
router.post('/', (req, res, next) => {
    var email = req.body.email; 
    Account.findOne({email: new RegExp(email, 'i')}).exec((err, account) => {
        if(err){
            return next(err);
        }
        if (account){
            return res.status(400).json({'message' : 'Email is already taken.'});
        }
        var account = new Account(req.body);
        account.save((err) => {
            if(err){
                return next(err);
            }
            res.status(201).json({'account': account});
        });
    });
});
 
// Return a list of all accounts
router.get('/', (req, res, next) => {
    Account.find((err, accounts) => {
        if(err){
            return next(err);
        }
        res.json({'accounts': accounts});
    });
});

// Delete all accounts
router.delete('/', (req, res, next) => {
    Account.deleteMany((err, accounts) => {
        if(err){
            return next(err);
        }
        res.json({'message': 'Accounts deleted', accounts});
    });
});

// Return the account with the given ID
router.get('/:account_id', (req, res, next) => {
    var id = req.params.account_id;
    Account.findById(id, (err, account) => {
        if(err){
            return next(err);
        }
        if (account === null){
            return res.status(404).json({'message' : 'Account not found'});
        }
        res.json(account);
    });
});

// Partially update account with the given ID
router.patch('/:account_id', (req, res, next) => {
    var id = req.params.account_id;
    Account.findById(id, (err, account) => {
        if (err){
            return next(err);
        }
        if (account === null){
            return res.status(404).json({'message': 'Account not found'});
        }
        account.name = (req.body.name || account.name);
        account.email = (req.body.email || account.email);
        account.save();
        res.json(account);
    });
});

// Delete account with the given ID
router.delete('/:account_id', (req, res, next) => {
    var id = req.params.account_id;
    Account.findOneAndDelete({_id: id}, (err, account) => {
        if(err){
            return next(err);
        }
        if(account === null){
            return res.status(404).json({'message': 'Account not found'});
        }
        res.json(account);
    });
});

// Create a new profile for an account
router.post('/:account_id/profiles', (req, res, next) => {
        var id = req.params.account_id;
        var profile = new Profile(req.body);
        Account.findById(id, (err, foundAccount) => {
            if(err){
                return next(err);
            }
            if(foundAccount === null){
                return res.status(404).json({'message': 'Account not found'});
            }
            profile.account = foundAccount._id;
            profile.save((err, savedProfile) => {
            if(err){
                return next(err);
            }
            foundAccount.profile = savedProfile._id;
            foundAccount.save();
            res.status(201).json({'profile': profile});
            });
        });
});

// Return all profiles for an account - created for MS1 when 6 entities were needed
// Each account could have 1 or more profiles
router.get('/:account_id/profiles', (req, res, next) => {
    var id = req.params.account_id;
    Account.findById(id, (err, account) => {
        if(err){
            return next(err);
        }
        if (account === null){
            return res.status(404).json({'message' : 'Account not found'});
        }
        Profile.find({'account': id}, (err, foundProfiles) => {
            if(err){
                return next(err);
            }
            if(foundProfiles === null){
                return res.status(404).json({'message' : 'Profile not found'});
            }
            res.json({'profile': foundProfiles});
        });
    });
});

// Return a profile for an account with the given ID
router.get('/:account_id/profiles/:profile_id', (req, res, next) => {
    var account_id = req.params.account_id;
    var profile_id = req.params.profile_id;
    Account.findById(account_id, (err, account) => {
        if(err){
            return next(err);
        }
        if (account === null){
            return res.status(404).json({'message' : 'Account not found'});
        }
        Profile.findById(profile_id).where({'account': account_id}).exec((err, foundProfile) => {
            if(err){
                return next(err);
            }
            if(foundProfile === null){
                return res.json({'message': 'Profile for account not found'});
            }
            res.json({'profile': foundProfile});
        });
    });
});

// Delete a profile for an account with the given ID
router.delete('/:account_id/profiles/:profile_id', (req, res, next) => {
    var account_id = req.params.account_id;
    var profile_id = req.params.profile_id;
    Account.findById(account_id, (err, account) => {
        if(err){
            return next(err);
        }
        if (account === null){
            return res.status(404).json({'message' : 'Account not found'});
        }
        Profile.findByIdAndDelete(profile_id).where({'account': account_id}).exec((err, foundProfile) => {
            if(err){
                return next(err);
            }
            if(foundProfile === null){
                return res.json({'message': 'Profile for account not found'});
            }
            res.json({'Deleted profile': foundProfile});
        });
    });
});

// Create a new diet with account ID
router.post('/:account_id/diets', (req, res, next) => {
    var id = req.params.account_id;
    var diet = new Diet(req.body);
    Account.findById(id, (err, foundAccount) => {
        if(err){
            return next(err);
        }
        if(foundAccount === null){
            return res.status(404).json({'message': 'Account not found'});
        }
        diet.save((err, savedDiet) => {
        if(err){
            return next(err);
        }
        foundAccount.diet = savedDiet._id;
        foundAccount.save();
        res.status(201).json({'diet': diet});
        });
    });
});

// Create a new meal with account ID
router.post('/:account_id/meals', (req, res, next) => {
    var id = req.params.account_id;
    var meal = new Meal(req.body);
    Account.findById(id, (err, foundAccount) => {
        if(err){
            return next(err);
        }
        if(foundAccount === null){
            return res.status(404).json({'message': 'Account not found'});
        }
        meal.account = foundAccount;
        meal.save((err, savedMeal) => {
          if(err){
            return next(err);
          }
        foundAccount.meals.push(savedMeal._id);
        foundAccount.save();
        res.status(201).json(meal);
        });
    });
});

// Return all meals for a account
router.get('/:account_id/meals', (req, res, next) => {
    var id = req.params.account_id;
    var filter = req.query.filter || ''
    var filterQuery = {
        date: new RegExp(filter, 'i')
    }
    Account.findById(id, (err, account) => {
        if(err){
            return next(err);
        }
        if (account === null){
            return res.status(404).json({'message' : 'Account not found'});
        }
        Meal.find(filterQuery).where({'account': id}).exec((err, foundMeals) => {
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
