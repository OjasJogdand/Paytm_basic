import express from "express";
import { a,b } from "../zod.js";
import {userdata,accounts} from "../db/db.js";
import jwt from "jsonwebtoken";
import  JWT_SECRET  from "../config.js";
import authMiddleware from "../middleware.js";
import zod from "zod";

const userRouter=express.Router();

userRouter.post("/signup",async function(req,res){
    const user=a.parse(req.body);
    const amount=Math.floor(Math.random()*10000)+1;
    if(user)
    {
        const user_db=await userdata.create(req.body);
        const userId=user_db._id;
        await accounts.create({userId:userId,balance:amount});
        const token=jwt.sign({userId},JWT_SECRET);
        res.json({token});
    }
    else
    {
        res.json({msg:"Email already taken / Incorrect inputs"});
    }
});
userRouter.post("/signin",async function(req,res){
    const user2=b.parse(req.body);
    if(user2)
    {
        const user_db=await userdata.findOne({username:req.body.username,password:req.body.password});
        if(user_db)
        {
            const userId=user_db._id;
            const token=jwt.sign({userId},JWT_SECRET);
            res.json({token});
        }
        else
        {
            res.json({msg:"Invalid credentials"});
        }
    }
    else
    {
        res.json({msg:"Email already taken / Incorrect inputs"});
    }
});
const updatebody=zod.object({password:zod.string().optional(),firstName:zod.string().optional(),lastName:zod.string().optional()});
userRouter.put("/",authMiddleware,async function(req,res){
     const user3=updatebody.parse(req.body);
     if(user3)
     {
        await userdata.updateOne({_id:req.userId},req.body);
        res.json({msg:"updated succesfully"});
     }
     else{
        res.json({msg:"Error while updating information"});
     }
});
userRouter.get("/bulk",async function(req,res){
    const name=req.query.filter;
    const users=await userdata.find({$or:[{firstName:{$in:[name]}},{lastName:{$in:[name]}}]});
    res.json({user:users.map(function(user){
        return {
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        _id:user._id
        }
    })});
});
export default userRouter;