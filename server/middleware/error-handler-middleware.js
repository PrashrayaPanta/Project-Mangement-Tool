class customError extends Error {

    success;
    statusCode;
    status;

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >=400 && statusCode < 500 ? "fail":"error";
        this.success = false;
        Error.captureStackTrace(this, customError);
    }

}


export const errorHandler = (err, req, res, next) =>{

    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    const success = err.success || false;
    const status = err.status || "error";
    res.status(statusCode).json({
        message,
        status,
        success,
        data:null
    })



}



export default customError;


