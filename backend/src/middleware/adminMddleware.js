import HandleError from "../utils/handleError.js"

  const adminOnly = (req,res,next) => {

        if(!req.user){
              return  next (new HandleError("Please login first" , 401));

        }

        if(req.user.role !== "admin"){
            return next(new HandleError("Only admin can access this route" , 403))
        }
          next();

  }

   export default adminOnly;