const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,    
        trim: true
    },
    email:{
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Wrong email input')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password must not contain "password"')
            }
        }
    },
    age:{
        type : Number,
        default : 0,
        validate(value){
            if(value<0){
                throw new Error('Age cannot be negative ')
            }
        }
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps:true
})


userSchema.virtual('tasks',{
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'
})


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id:user._id.toString() }, 'thisismynewcourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
     
    return token


}   //method are available on instances


userSchema.methods.toJSON = function () {
    const user = this
    console.log(user)
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    console.log(userObject)
    return userObject
}

userSchema.statics.findByCredentials = async (email, password)=>{  //statics are available on models
    const user = await User.findOne({email})
    if(!user){
        throw new Error('unable to login!')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }

    return user

}

userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8) 
    }
    console.log(';dddffmfm')
    next()
})

userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({ owner : user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User