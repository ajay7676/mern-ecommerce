
 const getProducts  = async (req,res) => {

    res.status(200).json({
        success: true,
        message: "All Products API is working",
    })
      
 }


 export {getProducts}

