const  mongoose = require("mongoose")

const { Schema } = require("mongoose")
const UserModel = new Schema({
    name: {
        type: String,
      
    },
    email: String,
    password: String,
    role: {
        type: String,
        default:"user"
    }
})
module.exports = mongoose.model("User10",UserModel)