var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mealSchema = new Schema ({
    date: {
        type: Date,
        required: true
    },
    mealType: {
        type: String,
        enum: ["breakfast", "lunch", "dinner", "snack"]
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredients'
    }],
    diary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diaries'
    }
});

module.exports = mongoose.model('Meals', mealSchema);