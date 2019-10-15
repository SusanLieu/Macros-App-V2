var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mealSchema = new Schema ({
    date: {
        type: String,
        required: true
    },
    mealType: {
        type: String,
        enum: ["breakfast", "lunch", "dinner", "snack"]
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
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
    },
    diary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diaries'
    }
});

module.exports = mongoose.model('Meals', mealSchema);