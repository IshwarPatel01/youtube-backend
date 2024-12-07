// database se jab bhi baat karne ki koshish karege toh problem aa sakti hai (try-catch me wrap karo)
// database is always in another continent (use async await)
// require('dotenv').config({path: "./env"})
import dotenv from "dotenv"

// 2nd approach
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000)
    console.log(`Server is running at port : ${process.env.PORT}`);
    
})
.catch((err) => {
    console.log("Mongo DB connection failed!!!", err);
    
})


// //1st Approch
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express"
// const app = express()
// ( async () => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("ERROR: " , error);
//         throw error
//        })
//        app.listen(process.env.PORT, () => {
//         console.log(`App is listening on port ${process.env.PORT}`);
        
//        })
//     }catch(error){
//         console.error("ERROR: ", error);
//         throw err
//     }
// })()
