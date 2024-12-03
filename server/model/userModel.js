const  mongoose = require("mongoose")

const { Schema } = require("mongoose")
const UserModel = new Schema({
    name: String,
    email: String,
    password:String
})
module.exports = mongoose.model("User10",UserModel)