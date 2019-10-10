var express = require('express');
var router = express.Router();
var Account = require('../models/Account');
var Profile = require('../models/Profile');
var Diet = require('../models/Diet');
var Diary = require('../models/Diary');

// Create a new account
router.post('/', (req, res, next) => {
    var email = req.body.email;
    Account.findOne({email: email}).exec((err, account) => {
        if(err){
            return next(err);
        }
        if (account){
            return res.status(400).json({'message' : 'Email is already taken.'});
        }
    });
    var account = new Account(req.body);
    account.save((err) => {
        if(err){
            return next(err);
        }
        res.status(201).json({'account': account});
    });
});
 
// Return a list of all accounts
router.get('/', (req, res, next) => {
    Account.find().populate('profile').exec((err, accounts) => {
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
    Account.findById(id).populate('profile').exec((err, account) => {
        if(err){
            return next(err);
        }
        if (account === null){
            return res.status(404).json({'message' : 'Account not found'});
        }
        res.json(account);
    });
});

// Update account with the given ID
router.put('/:account_id', (req, res, next) => {
    var id = req.params.account_id;
    Account.findById(id, function(err, account) {
       if(err){
           return next(err);
       } 
       if (account === null){
           return res.status(404).json({'message' : 'Account not found'});
       }
       account.name = req.body.name;
       account.email = req.body.email;
       account.password = req.body.password;
       account.save();
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
        account.password = (req.body.password || account.password);
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

// Return all profiles for an account
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
            res.json({'profiles': foundProfiles});
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

// Create a new diary with account ID
router.post('/:account_id/diaries', (req, res, next) => {
    var id = req.params.account_id;
    var diary = new Diary(req.body);
    Account.findById(id, (err, foundAccount) => {
        if(err){
            return next(err);
        }
        if(foundAccount === null){
            return res.status(404).json({'message': 'Account not found'});
        }
        diary.account = foundAccount._id;
        diary.save((err, savedDiary) => {
        if(err){
            return next(err);
        }
        foundAccount.diary = savedDiary._id;
        foundAccount.save();
        res.status(201).json({'diary': diary});
        });
    });
});

// Return the diary with account ID
router.get('/:account_id/diaries', (req, res, next) => {
    var id = req.params.account_id;
    Account.findById(id, (err, foundAccount) => {
        if(err){
            return next(err);
        }
        if(foundAccount === null){
            return res.status(404).json({'message': 'Account not found'});
        }
        Diary.find({'account': id}, (err, foundDiary) => {
            if(err){
                return next(err);
            }
            if(foundDiary === null){
                return res.status(404).json({'message' : 'Diary not found'});
            }
            res.json(foundDiary);
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
        //diet.account = foundAccount;
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

module.exports = router;