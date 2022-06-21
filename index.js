const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute  = require('./routes/auth');
const usersRoute  = require('./routes/users');
const hotelsRoute  = require('./routes/hotels');
const roomsRoute  = require('./routes/rooms');
const cookieParser = require('cookie-parser');
const cors = require('cors')

/* Creating an express app and configuring the dotenv. */
const app = express();
dotenv.config();

/**
 * This function connects to the mongoDB database and throws an error if it fails.
 */
const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    }catch (error){
        throw error;
    }
};

/* A callback function that is called when the connection is disconnected. */
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!");
})

/* A callback function that is called when the connection is established. */
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected!");
})

//middleware
app.use(cors());
app.use(cookieParser())
app.use(express.json())

/* A middleware that is used to catch errors. */
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

/* A middleware that is used to catch errors. */
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

/* Listening to the port 8800. */
app.listen(process.env.PORT || 8800, ()=>{
    connect()
    console.log("Connected on PORT.");
});