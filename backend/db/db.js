import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Ojas:pa6ZJOwIH6KXtnYR@cluster0.u83xy.mongodb.net/Paytm");

const userschema=mongoose.Schema({
    firstName:String,
    Lastname:String,
    username:String,
    password:String
});

const user=mongoose.model("User",userschema);
export default user;