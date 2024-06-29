const errorHandler = (err,req,res,next)=>{
    if(err.message == ""){
        err.message = "Internal Server error!"
    }
    console.log(err.message);
    return res.status(404).json({
        success : false,
        message : err.message
    });
};


module.exports = errorHandler;