import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

// http://localhost:5173/sign-up
export const signup = async (req, res) => {
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
        [username, email, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new errorHandler(400, "All fields are required")
    }
    //3.step
    const existedUser = await User.findOne({
        //use oprerator $
        $or: [{ username }, { email }]
    })
    if (existedUser) {
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
    if (!createdUser) {
        throw new errorHandler(500, "Something went wrong while registering the user")
    }
    //7.step
    return res.status(201).json("User created successfully!")

};

//for sign in

// localhost:3000/api/auth/signin
export const signin = async (req, res, next) => {
    //get data from req of body
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credential!'));
        //use jwt
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        // done all the jwt aand cookies now we can remove password from sending back to the user 
        const { password: pass, ...rest } = validUser._doc; // the rest in res.cookies in json(validUser) to json(rest)
        //save the token as the cookies
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        // and write httpOnly for cookies i.e. no other 3rd party application can access the cookies and make safer
    } catch (error) {
        next(error);

    }
};

export const google = async (req, res, next)=>{
    try {
        //check if user exit
        const user = await user.findOne({ email: req.body.email})
        if(user){
            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
               .cookie('access_token', token, { httpOnly: true })
               .status(200)
               .json(rest);
        }else{
            //generate the password when by google login
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new user({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().
                toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo });
            //created new user saved]
            await newUser.save();
            const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}