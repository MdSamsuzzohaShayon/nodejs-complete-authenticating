const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter an password"],
        minlength: [6, "Minimum password length is 6 charecters"]
    }

});


// Mongoose Hooks
// THIS METHOD WORK AFTER CERTAIN ACTION OF SCHEMA
// The «String|RegExp» method name or regular expression to match method name
// https://mongoosejs.com/docs/api.html#schema_Schema-post
userSchema.post("save", function (docs, next){
    console.log('this fired after a document was saved');
    console.log("New user is create and saved", docs);
    // IF YOU DON'T CALL NEXT IT WON'T RESPONSE
    next();
});




// Mongoose Hooks
// THIS METHOD WORK BEFORE CERTAIN ACTION OF SCHEMA
// https://mongoosejs.com/docs/api.html#schema_Schema-pre
userSchema.pre('save', async function (next){
    console.log("User about to be created and save, local instance of user", this);

    const salt = await bcrypt.genSalt();
    // THIS REFERS TO USER INSTANCE WE ARE GOING TO CREATE
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



// STATIC METHOD TO LOGIN USER
// https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
userSchema.statics.login = async function (email, password) {
    console.log("login  from user js");
    // FINDING USER FROM DATABASE
    const user = await this.findOne({email});
    // IF WE FOUND THE USER IT WILL MATCH THE PASSWORD
    console.log(`User from User.js :  ${user}`);
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        // IF PASSWORD DOES MATCH IT WILL RETURN THE USER
        if(auth){
            return user;
        }
        // IF PASSWORD DIDN'T MATCH
        throw Error("incorrect password");
    }
    // IF EMAIL IS NOT FOUND
    throw Error("incorrect email");
}


const User  = mongoose.model('user', userSchema);
module.exports = User;