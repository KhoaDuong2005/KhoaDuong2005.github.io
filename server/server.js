const express = require("express")
const mongoose= require("mongoose")
const path = require("path")
const port = 4269
require("dotenv").config();

const app = express();

// get files
app.use(express.static(path.join(__dirname, "../")));


app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGODB); 
const db =  mongoose.connection 
db.once("open", ()=>{ //check if mongodb is connected
    console.log("Mongodb connected succesfuly");
})


const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: {type: Date, default: Date.now}
})
const Message = mongoose.model("data", messageSchema)



app.post("/post", async(req, res)=>{
    const {name, email, message} = req.body
    const user = new Message({
        name,
        email,
        message
    })
    await user.save();
    console.log(user);
    res.send("Message sent successfully")
})


// Checking if the server is started or not
app.listen(port, ()=>{
    console.log("Server started");
})