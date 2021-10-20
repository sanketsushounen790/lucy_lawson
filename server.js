import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

//App Config
dotenv.config()
const port = process.env.PORT 
const uri = process.env.LUCY_LAWSON_URI

//Middlewares
const app = express()
app.use(express.json())
/* app.use(express.static(__dirname + "./cards")) */

//Database Config
mongoose.connect(uri , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then((result)=>{
    console.log("connected to the lucy_lawson database")
})
.catch((err)=>{
    console.log(err)
})


//API Endpoints
app.get("/", (req, res)=>{
    res.status(200).send("Bot server is running")
})

//Start server 
export const keepAlive = () => {
    app.listen(port, ()=>{
        console.log(`app listen on port ${port}`)
    })
}

/* keepAlive() */

