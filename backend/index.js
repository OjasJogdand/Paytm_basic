import express from "express";
import userRouter from "./routes/user.js";
//import router from "./routes/index.js";
import cors from "cors";
import accountrouter from "./routes/accounts.js";

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("/api/v1",router);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/account",accountrouter);
app.listen("3000",function(){
    console.log("listening on port 3000");
});
//done 