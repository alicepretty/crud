const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

Name:{
    type:String,
    required:true,
},

Email:{
    type:String,
    required:true,
},

Message:{
    type:String,
    required:true,
},

},{timestamps:true},
);
const comment = mongoose.model('comment', commentSchema);
module.exports = comment;


