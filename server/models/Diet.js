var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dietSchema = new Schema ({
    //Only for the use of admin to name preset macro splits
    name: {
        type: String
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Diets', dietSchema);

