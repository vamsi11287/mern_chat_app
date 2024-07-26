const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
const userRoutes = require("./routes/userRoutes");
const messageModel = require("./modals/messageModel");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
const PORT = process.env.PORT 


mongoose.set('strictQuery',true)

const ConnectDb = async() =>{
    try{
        const conn = await mongoose.connect("mongodb://127.0.0.1/chat",{
           
        })
        console.log(`Db is connected`)
    }
    catch(err){
        console.log(err)
    }
}
ConnectDb()


app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

app.listen(PORT, () => console.log(`server is running on ${PORT}`))



