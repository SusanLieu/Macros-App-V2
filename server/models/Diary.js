var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var diarySchema = new Schema ({
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meals'
    }],
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accounts'
    }
});

module.exports = mongoose.model('Diaries', diarySchema);