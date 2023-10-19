const globalErrorHandler = (err, req, res, next) => {

    const stack = err?.stack;

    const statuscode = err?.statusCode ? err?.statusCode : 500;

    const message = err?.message;

    res.status(statuscode).send({
        stack,
        message
    });

}


module.exports = globalErrorHandler;