const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
//     res.status(503).send("Under maintainance, try after some time")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//without middleware: new request:- route handler
//
//with middleware: new request:- do something -> run route handler

app.listen(port, () => {
    console.log('Server is up ' + port )
})


// const user = require('./models/user')
// const task =  require('./models/task')
// const task = mongoose.model('Task')
// const user = mongoose.model('User')

// const main = async () => {
//     // const task1 = await task.findById('5e78b0ba08b6a33599b1b3b7')
//     // console.log(task1)
//     // await task1.populate('owner').execPopulate()
//     // console.log(task1.owner )
//      const user1  = await user.findById('5e78b0b308b6a33599b1b3b5')
//      console.log(user1)
//      await user1.populate('tasks').execPopulate()
//      console.log(user1.tasks)
// }

// main()