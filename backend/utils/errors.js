class AppError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = {
    AppError,
    handleErrors: (err,res) => {
        const statusCode = err.statusCode || 500
        const message = err.message || 'Server Error'

        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message
        })
    }
}