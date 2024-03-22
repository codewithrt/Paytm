const express = require("express");
const {User,Account} = require("../db")
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");
const zod = require("zod");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();



const SignupZod = zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
})

router.post("/signup",async(req,res)=>{
    // console.log(req);
    const success = SignupZod.safeParse(req.body.params);
    if(!success){
        res.status(411).json({message : "Email already Exist!!! / Incorrect Inputs"});
        return;
    }
    const username = req.body.params.username;
    const isUser = await User.findOne({username:username});

    if(isUser !== null){
         res.status(411).json({message : "Email already Exist!!! / Incorrect Inputs"});
         return;
    }
    const user = await User.create({
        username:username,
        password:req.body.params.password,
        firstName:req.body.params.firstName,
        lastName:req.body.params.lastName,
    })
    const account = await Account.create({
        UserId:user._id,
        balance:1 + Math.random() * 10000,
    })
    const userId = user._id;
    const token = jwt.sign({
        userId:userId
    },JWT_SECRET_KEY);

    res.status(200).json({
        message:"User Created Sucessfully",
        token:token,
    })
    return;
})



// Sign in route
const SigninZod = zod.object({
    username:zod.string().email(),
    password:zod.string(),
})
router.post("/signin",async(req,res)=>{
    // console.log(req);
    const success = SigninZod.safeParse(req);
    if(!success){
        res.status(411).json({
            message:"Error while Logging in",
        })
        return;
    }
    const username = req.body.params.username;
    const password = req.body.params.password;
    // console.log(username,password);
    const UserStat = await User.findOne({username:username,password:password});
    if(UserStat){
        const token = jwt.sign({
            userId  : UserStat._id,
        },JWT_SECRET_KEY)
    //    console.log(token);
        res.status(200).json({
            token:token,
        })
        return;
    }
    // console.log("I logged");
    res.status(411).json({
        message:"Error while Logging in",
    })
   return;
})

// update method

router.put("/update",authMiddleware,async(req,res)=>{
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    try {
        const user = await User.findByIdAndUpdate({_id:req.userId},{
            password:password,
            firstName:firstName,
            lastName:lastName,
        })
        user.save();
        res.status(200).json({
            message:"Updated Successfully",
        })
        return;
    } catch (error) {
        res.json(411).json({
            message:"Error while updating !!!",
        })
        return;
    }
    
})

router.get("/bulk",async(req,res)=>{
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    // console.log(req);
    // console.log(firstName);
    let user
    try {
        if(firstName !== "" || lastName !== ""){
        user = await User.find({
                $or: [
                    {
                        firstName: firstName
                    },
                    {
                        lastName: lastName
                    }
                ]
            
        });
    }else{
        user = await User.find({
    });
    }
    res.status(200).json({users:user.map(user=>({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }))});
    return;
    } catch (error) {
        console.log(error);
    }
    
    return;
})

router.get("/IsValidToken",authMiddleware,async(req,res)=>{
    try {
        const user = await User.findById({_id:req.userId});
        res.status(200).json({user:{
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
           }
        })
    } catch (error) {
        res.status(403).json({message:"User not found"});
    }
    

})

module.exports = router;