var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profiles'
    },
    diet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diets'
    },
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meals'
    }]
});

module.exports = mongoose.model('Accounts', accountSchema);