import bcrypt from "bcrypt";
import bluebird from 'bluebird';
import mongoose from "mongoose";

mongoose.Promise = bluebird;



//creation of schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

//after creation of schema we are creating model
// const User = mongoose.model('User', userSchema);


// mongoose  documentation pre hook for bcrypt the password before save link is https://mongoosejs.com/docs/middleware.html#pre

userSchema.pre('save', async function (next) {
    console.log('check in bcrypt')
    //if  password does not modified then return next
    if(!this.isModified("password")) return next();

    //when my passsword field save then take password and do incrypt and save 
    this.password = await bcrypt.hash(this.password, 10)
    console.log('password', this.password)
    next()
})

// inject some method by the help of mongoose
// design custom method 
// for design  we take user schema

userSchema.methods.isPasswordCorrect = async function (password) {
    //check the password
    //they return true or false
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;