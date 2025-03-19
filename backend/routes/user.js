import express from "express";
import { a,b } from "../zod.js";
import userdata from "../db/db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const userRouter=express.Router();

userRouter.post("/signup",async function(req,res){
    const user=a.parse({username:req.body.username,firstName:req.body.firstName,lastName:req.body.lastName,password:req.body.password});
    if(user)
    {
        const user_db=await userdata.create({username:req.body.username,firstName:req.body.firstName,lastName:req.body.lastName,password:req.body.password});
        const userId=user_db._id;
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
export default userRouter;