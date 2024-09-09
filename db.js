const mongoose = require('mongoose');
// const { number } = require('zod');
const mongoURL = process.env.DATABASE_URL ;
try{
mongoose.connect('mongodb+srv://ankittiwari9602:%40nkit7742@cluster0.2hhinlk.mongodb.net/ankit')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName:String
});


const accountSchema = new mongoose.Schema({
    userId:{

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },

    balance:{
        type: Number,
        required: true
    }
    
})
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account',accountSchema)
module.exports ={
    User,
    Account
}
}catch(e){
    console.log("can't connect to DB")
}