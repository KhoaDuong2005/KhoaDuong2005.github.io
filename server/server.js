const express = require("express")
const mongoose= require("mongoose")
const path = require("path")
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

//add cors 
app.use(cors({
    origin: "*",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"]
}));

// get files
app.use(express.static(path.join(__dirname, "../")));


app.use(express.urlencoded({extended: true}))
app.use(express.json());

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
    res.json({ success: true, message: 'Message sent successfully' });
})


//test if the server is working or not
app.get("/", (req, res) => {
    res.send("Server is up and running!");
  });

// Checking if the server is started or not
app.listen(port, ()=>{
    console.log("Server started");
})