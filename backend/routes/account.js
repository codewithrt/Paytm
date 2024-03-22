const express = require("express");
const mongoose = require("mongoose")
const { Account, User } = require("../db");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.get("/balance",authMiddleware,async(req,res)=>{
    const userId = req.userId;
    // console.log(userId);
    const account = await Account.findOne({
        UserId:userId
    })
//   console.log(account);
    res.status(200).json({
        balance:account.balance
    })
    return;
})

router.post("/transfer",authMiddleware,async(req,res)=>{
    // console.log(req);
    const to = req.body.params.to;
    const amount = req.body.params.amount;
    const user  = req.userId;
    const userbalance = await Account.findOne({
        UserId:user
    })
    // console.log(userbalance);
    if(!userbalance || userbalance.balance<amount){
        // console.log("I logged 1");
        res.send(400).json({
            message:"Insufficient Balance"
        })
        return;
    }
    const touser = await Account.findOne({
        UserId:to
    })
    
    if(touser === null){
        // console.log("I logged 2");
        res.status(400).json({
            message:"Invalid Account"
        })
        return;
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    await Account.updateOne({UserId:user},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({UserId:to},{$inc:{balance:amount}}).session(session);
    // commiting the Transaction
    await session.commitTransaction();

    res.status(200).json({
        message:"Transfer Successful"
    })
    return;
})


module.exports = router;

// async function transfer(req){
//     const to = req.body.to;
//     const amount = req.body.amount;
//     const user  = req.userId;
//     const userbalance = await Account.findOne({
//         UserId:user
//     })
//     // console.log(userbalance);
//     if(!userbalance || userbalance.balance<amount){
//         // res.send(400).json({
//         //     message:"Insufficient Balance"
//         // })
//         console.log("Insufficinet Balance");
//         return;
//     }
//     const touser = await Account.findOne({
//         UserId:user
//     })
  
//     console.log(touser);
//     if(touser === null){
//         // res.status(400).json({
//         //     message:"Invalid Account"
//         // })
//         console.log("Invalid Account");
//         return;
//     }

//     const session = await mongoose.startSession();
//     session.startTransaction();
//     await Account.updateOne({UserId:user},{$inc:{balance:-amount}}).session(session);
//     await Account.updateOne({UserId:to},{$inc:{balance:+amount}}).session(session);
//     // commiting the Transaction
//     await session.commitTransaction();

//     // res.status(200).json({
//     //     message:"Transfer Successful"
//     // })
//     console.log("Transfer Sucessful")
//     return;
// }

// transfer({
//     userId: "65f9ac5340a8987e98a33b63",
//     body: {
//         to: "65f9a5bfb606dd6e6ce6d7c9",
//         amount: 100
//     }
// })

// transfer({
//     userId: "65f9ac5340a8987e98a33b63",
//     body: {
//         to: "65f9a5bfb606dd6e6ce6d7c9",
//         amount: 100
//     }
// })
