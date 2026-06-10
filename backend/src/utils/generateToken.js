import jwt from "jsonwebtoken";

 const generateToken = ((userId) => {

     return jwt.sign(
        {userId},
        process.env.SECTRET_KEY,
        {
            expiresIn: process.env.EXPIRE_DAY || "7d"
        }
     )

 }) ;

  export default generateToken;