const express = require('express');
require('dotenv').config();
const app = express();
const connectToCloudinary = require('./config/Cloudinary')
connectToCloudinary();
const connect = require('./config/database')
connect();
const cors = require('cors');
app.use(cors());
const redis = require('redis');

const client = redis.createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.on("connect", async ()=>{
    console.log("Redis server connected"); 
    //client.flushAll();
}) 
client.on('error', (err) => {
    console.error('Redis error:', err);
});
client.connect();

module.exports = {client};

const PORT = process.env.PORT || 4000;

app.use(express.json());
const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));   


//---------------------------ROutes--------------------------------------
const photoPath = require('./Routes/Photo');
app.use("/api/v1", photoPath);

app.listen(PORT, ()=>{
    console.log(`Server started at port no: ${PORT}`);
})

app.get("/", (req, res)=>{
    res.send("hello");
})

