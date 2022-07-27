import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

//App Config
dotenv.config()
const port = process.env.PORT || 3500
const uri = process.env.LUCY_LAWSON_URI
const lucyHelloWords = [
    "Biết rồi đang dậy nè ! Từ từ !",
    "CC kêu hoài. Dậy rồi đây !",
    "Đang ngủ ngon dm ! Giờ thức luôn !",
    "Đang ngủ ngon haizz ! Hên cho mày là nay tao không quạu đó !",
    "Ayo Lucy thức dậy rồi đây !",
    "Mịa đang ngủ ngon ! Có việc gì mà đánh thức tao đó !"
]
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
    res.status(200).send(`${lucyHelloWords[Math.floor(Math.random() * lucyHelloWords.length)]}\nQuay lại discord đi !`)
})

//Start server 
export const keepAlive = () => {
    app.listen(port, ()=>{
        console.log(`app listen on port ${port}`)
    })
}

/* keepAlive() */

