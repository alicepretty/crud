import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

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
const comment = model('comment', commentSchema);
export default comment;


