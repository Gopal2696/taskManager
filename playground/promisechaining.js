require('../src/db/mongoose')
const User = require('../src/models/user')
const task = require('../src/models/task')

// User.findByIdAndUpdate('5e63956ee0c1abbda78358dd', {age:1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((user2)=>{
//     console.log(user2)
// }).catch((e)=>{
//     console.log(e)
// })

const removetaskandcount = async (id) => {
    // const task1 = await User.findByIdAndRemove(id)
    // const task2 = await task.countDocuments({completed:false})
    const users = await User.countDocuments({age:1})
    console.log(users)
    return users
}
removetaskandcount("5e639593ce8544be2527bee7").then((task3)=>{
    console.log(task3)
})



// createtask().save((err,task2)=>{
//     console.log(task2)
// })


// task.findByIdAndRemove('5e65c634304956dc8c38975e').then((tasks)=>{
//     console.log(tasks)
//     return task.countDocuments({completed:false})
// }).then((tasks1)=>{
//     console.log(tasks1)
// }).catch((e)=>{
//     console.log(e)
// })