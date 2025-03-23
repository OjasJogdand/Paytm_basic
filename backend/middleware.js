import jwt from "jsonwebtoken";
import jwtpassword from "./config.js"

function authMiddleware(req,res,next)
{
    const token=req.headers.authorization;
    const a=token.split(" ");
    const token1=a[1];
    const decoded=jwt.verify(token1,jwtpassword);
    if(decoded.userId)
    {
        req.userId=decoded.userId;
        next();
    }
    else{
        res.json({msg:"Invalid info"});
    }
}
export default authMiddleware;