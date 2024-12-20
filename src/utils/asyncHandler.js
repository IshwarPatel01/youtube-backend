const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}

export {asyncHandler}







// const asyncHandle = (fn) => async (req, res, next) => {
//     try{
//         await fn(req, res, next)
//     }catch (error){
//         res.status(err.code || 500).json({
//             sucess: false,
//             message: err.message
//         })
//     }
// }


// above are 2 approach