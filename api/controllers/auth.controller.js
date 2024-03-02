import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

//after creating a middleware in index.js then add next in signup
export const signup = async (req, res, next) =>{

   // console.log(req.body);
    //we get the information from the browser this is comming from the body they call a body request
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password, hashedPassword });
    try {
        await newUser.save();
     res.status(201).json('User created successfully!');

    } catch (error) {
       // res.status(500).json(error.message);//.message is use to get the message for error reason
       //after creating a  middleware for error then
       next(error);
       // suppose if we want to  create error  then
      // next(errorHandler(550, 'error from the function'));
    }
     
}