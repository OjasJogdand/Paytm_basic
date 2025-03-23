import express from "express";
import { accounts } from "../db/db.js";
import mongoose from "mongoose";
import authMiddleware from "../middleware.js";

const accountrouter=express.Router();
accountrouter.get("/balance",authMiddleware,async function(req,res){
    const userId=req.userId;
    const user=await accounts.findOne({userId:userId});
    res.json({balance:user.balance});
});
accountrouter.post("/transfer",authMiddleware,async function(req,res){
    const to=req.body.to;
    const userId=req.userId;
    const amount=req.body.amount;
    const session=await mongoose.startSession();
    session.startTransaction();
    const account1=await accounts.findOne({userId:userId}).session(session);
    if(!account1||account1.balance<amount)
    {
        res.json({msg:"insufficeient balance"});
        await session.abortTransaction();
    }
    const account2=await accounts.findOne({userId:to}).session(session);
    if(!account2)
    {
        res.json({msg:"invalid account"});
        await session.abortTransaction();
    }
    await accounts.updateOne({userId:userId},{$inc:{balance:-amount}}).session(session);
    await accounts.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
    res.json({msg:"transaction succesfull"});
    await session.commitTransaction();
});
export default accountrouter;