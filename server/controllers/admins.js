var express = require('express');
var router = express.Router();
var Admin = require('../models/Admin');

// Created for MS1 when 6 entities were needed

// Create a new admin
router.post('/', (req, res, next) => {
    var admin = new Admin(req.body);
    admin.save((err) => {
        if(err){
            return next(err);
        }
        res.status(201).json(admin);
    });
});

// Return all admins
router.get('/', (req, res, next) => {
    Admin.find((err, admins) => {
        if(err){
            return next(err);
        }
        res.json(admins);
    });
});

// Return admin with the given ID
router.get('/:admin_id', (req, res, next) => {
    var id = req.params.admin_id;
    Admin.findById(id, (err, admin) => {
        if(err){
            return next(err);
        }
        if(admin === null){
            return res.status(404).json({'message' : 'Admin not found'});
        }
        res.json(admin);
    });
});

// Update admin with the given ID - used for when an admin is changed but want to keep the same access
router.put('/:admin_id', (req, res, next) => {
    var id = req.params.admin_id;
    Admin.findById(id, function(err, admin) {
       if(err){
           return next(err);
       } 
       if (admin === null){
           return res.status(404).json({'message' : 'Admin not found'});
       }
       admin.email = req.body.email;
       admin.password = req.body.password;
       admin.save();
       res.json(admin);
    });
});

// Partially update admin with the given ID - used for when an admin just simply wants to change password or email
router.patch('/:admin_id', (req, res, next) => {
    var id = req.params.admin_id;
    Admin.findById(id, (err, admin) => {
        if (err){
            return next(err);
        }
        if (admin === null){
            return res.status(404).json({'message': 'Admin not found'});
        }
        admin.email = (req.body.email || admin.email);
        admin.password = (req.body.password || admin.password);
        admin.save();
        res.json(admin);
    });
});

// Delete admin with the given ID
router.delete('/:admin_id', (req, res, next) => {
    var id = req.params.admin_id;
    Admin.findOneAndDelete({_id: id}, (err, admin) => {
        if(err){
            return next(err);
        }
        if(admin === null){
            return res.status(404).json({'message': 'admin not found'});
        }
        res.json(admin);
    });
});

module.exports = router;