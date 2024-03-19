
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rtembhurne2802:2nlQjf8jbuu2w8TQ@cluster0.pqixoov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => { console.log("Database Connected") }).catch((err) => { console.log(err) });

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
})



const AccountSchema = new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId, // Reference to User model
        ref:'User',
        required:true,
    },
    balance:{
        type:Number,
        required:true,
    }
})

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account",AccountSchema);
module.exports = { User , Account};