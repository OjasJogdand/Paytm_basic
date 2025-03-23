import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Ojas:pa6ZJOwIH6KXtnYR@cluster0.u83xy.mongodb.net/Paytm");

const userschema=mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String
});
const accountsschema=mongoose.Schema({
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:"User"
    },
    balance:Number
});
const userdata=mongoose.model("User",userschema);
const accounts=mongoose.model("accounts",accountsschema);
export  {userdata,accounts};