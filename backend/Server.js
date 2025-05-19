import express from "express"
import cors from "cors"
import "dotenv/config"

import connectDb from "./config/connectDb.js"

import BlogRoutes from "./routes/BlogRoutes.js";
import UserRoute from "./routes/UserRoute.js";




let app = express()

app.use(cors())
app.use(express.json())


// connect to database:
connectDb();


app.use("/api/blogs",BlogRoutes)
app.use("/api/user",UserRoute)



app.listen(process.env.PORT || 5500,()=>{
    console.log("Server listening on 5500...")
})