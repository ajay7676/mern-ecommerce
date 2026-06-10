import generateToken from "./generateToken.js";


 const sendToken = (user,statusCode,res,message) => {

     const token = generateToken(user._id);

     res.cookie("token" , token , {
        httpOnly: true ,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
     })
      return res.status(201).json({
         success: true,
         user: {
            id: user._id,
            name: user.name,
            email: user.email,
         }
      })


 }

 export default sendToken;