import generateToken from "./generateToken.js";


 const sendToken = (user,statusCode,res,message) => {

     const token = generateToken(user._id);

     res.cookie("token" , token , {
        httpOnly: true ,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

     })
      return res.status(statusCode).json({
         success: true,
         message,
         user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
         }
      })


 }

 export default sendToken;