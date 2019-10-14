var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredientSchema = new Schema ({
    name: {
        type: String,
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
});

module.exports = mongoose.model('Ingredients', ingredientSchema);