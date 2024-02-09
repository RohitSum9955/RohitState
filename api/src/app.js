import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

//now configure of cors from documentation

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
 app.use(express.json({limit: "16kb"}))
 //when some url has been upload then
 app.use(express.urlencoded({extended: true, limit: "16kb"}))

 //public is folder name 
 app.use(express.static("public"))
 //server se cookie-parser user browser access and set  this by 
 app.use(cookieParser())

export { app }