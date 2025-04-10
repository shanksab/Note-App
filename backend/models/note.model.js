const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",  // Reference to the User model
        required: true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    isPinned:{
        type:Boolean,
        required:false,
        default:false
    },
    createdOn:{
        type:Date,
        default: new Date().getTime()
    },
})


module.exports = mongoose.model("Note",noteSchema)