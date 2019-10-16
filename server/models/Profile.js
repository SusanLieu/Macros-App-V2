var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
    age: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["female", "male"]
    },
    activityLevel: {
        type: String,
        enum: ["sedentary", "light", "moderate", "active", "very active"]
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accounts'
    }
});

module.exports = mongoose.model('Profiles', profileSchema);