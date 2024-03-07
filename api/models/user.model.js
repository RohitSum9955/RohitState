import mongoose from "mongoose";
import bcrypt from "bcrypt"

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
const User = mongoose.model('User', userSchema);


// mongoose  documentation pre hook for bcrypt the password before save link is https://mongoosejs.com/docs/middleware.html#pre

userSchema.pre('save', async function (next) {
    //if  password does not modified then return next
    if(!this.isModified("password")) return next();

    //when my passsword field save then take password and do incrypt and save 
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// inject some method by the help of mongoose
// design custom method 
// for design  we take user schema

userSchema.methods.isPasswordCorrect = async function (passowrd) {
    //check the password
    //they return true or false
    return await bcrypt.compare(passowrd, this.passowrd)
}
export default User;