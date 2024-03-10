import User from "../models/user.model.js";
// import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

//after creating a middleware in index.js then add next in signup
// export const signup = async (req, res) =>{

//    // console.log(req.body);
//     //we get the information from the browser this is comming from the body they call a body request
//     const { username, email, password } = req.body;
//     const hashedPassword = bcryptjs.hashSync(password, 10);
//     const newUser = new User({username, email, password, hashedPassword });
//    // try {
//         await newUser.save();
//      res.status(201).json('User created successfully!');

    // } catch (error) {
    //    // res.status(500).json(error.message);//.message is use to get the message for error reason
    //    //after creating a  middleware for error then
    //    next(error);
    //    // suppose if we want to  create error  then
    //   // next(errorHandler(550, 'error from the function'));
    // }
     
//}
export const signup = async(req, res)=>{
    // res.status(500).json({
    //     message: "User created successfully!"
    // })
    // steps
    // 1.get user details from frontend
    // 2.validation - not empty
    // 3.check if user already exists: username, email
    // 4. create user object - create entry in db
    // 5. remove password and refresh token field from response
    // 6. check for user creation
    // 7. return res

    const { username, email, password } = req.body
    //console.log("email:", email);
    //2.step
    if (
        [username, email, password].some((field)=>
        field?.trim() === "")
    ) {
        throw new errorHandler(400,"All fields are required")
    } 
    //3.step
    const existedUser = await User.findOne({
        //use oprerator $
        $or: [{ username }, { email }]
    })
    if (existedUser){
        throw new errorHandler(409, "User with email or username already exists")
    }

    //4.step
    const user = await User.create({
        email,
        password,
        username: username.toLowerCase()
    })
    //5.step
    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    
    //6.step
    if(!createdUser) {
        throw new errorHandler(500, "Something went wrong while registering the user")
    }
    //7.step
    return res.status(201).json("User created successfully!")

}