const Task = require('../models/task')
const express = require('express')
const auth = require('../Middleware/auth')
const router = new express.Router

router.post('/tasks', auth, async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks',auth , async (req,res)=>{
    const match = {}
    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    try{
        await req.user.populate({
            path: 'tasks', 
            match,
            options : {
                limit : parseInt(req.query.limit), 
                skip : parseInt(req.query.skip)
            } 
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req,res)=>{
    const _id = req.params.id
    try{
        const task_id = await Task.findById({_id, owner : req.user._id})
        if (!task_id){
            res.status(404).send()
        }
        res.send(task_id)

    }catch(e){
        res.status(404).send(e)
    }
})

router.patch("/tasks/:id", auth, async (req,res)=>{
    const allowedmethod = ['description', 'completed']
    const updatemethod = Object.keys(req.body)
    const isvalidmethod = updatemethod.every(update => allowedmethod.includes(update))
    if(!isvalidmethod){
        res.status(400).send({error:"invaild update!"})
    }
    const _id = req.params.id
    console.log(_id)
    try{
        const task = await Task.findOne({_id, owner:req.user._id})
        console.log(task)
        if(!task){
            res.status(404).send()
        }
        // findByIdAndUpdate bypasses the .save method
        updatemethod.forEach(element => task[element] = req.body[element] )
        await task.save()
        
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth,  async (req,res)=>{
    try{
        console.log(req.user)
        const task = await Task.findOneAndDelete({ _id : req.params.id, owner : req.user._id})
        if(!task){
            res.status(400).send({'error':'invalid task'})
        }
        res.send(task)
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router