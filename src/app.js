import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()
app.use(cors({ // use for middleware and configuration
    origin: process.env.CORS_ORIGIN,
    credentials : true
}))

// 3 major config
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser(``))

export { app }