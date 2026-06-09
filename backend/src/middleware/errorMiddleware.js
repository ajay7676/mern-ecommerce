
 const errorHandler = (err,req,res,next) => {

    let statusCode = err.statusCode || 500;
    let message = err.message;

    // Dulicate Key Error
    if(err.code === 11000){
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`
    }

    res.status(statusCode).json({
        success: false,
        message: message || "Internal Server Error",
        statusCode
    })


 }

 export default errorHandler;