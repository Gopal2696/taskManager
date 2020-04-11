const express = require("express");
require("./db/mongoose");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next)=>{
//     res.status(503).send("Under maintainance, try after some time")
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//without middleware: new request:- route handler
//
//with middleware: new request:- do something -> run route handler

app.listen(port, () => {
    console.log("Server is up " + port);
});
