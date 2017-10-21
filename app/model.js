var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var NumberSchema = new Schema({
    numbers:{
        type:Number,
        requires:true
    },
    secret:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('number', NumberSchema);
