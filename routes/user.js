const express = require('express')
const zod = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');
const bulkRouter = require('./bulk.js')

const router = express.Router();

router.use('/bulk', bulkRouter)

const signupBody = zod.object({
    username: zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post('/signup',async (req,res)=>{
    const {success} = signupBody.safeParse(req.body)
   
    if (!success){
        return res.status(411).json({massafe:"wrong credentials"})
        }
    const existingUser = await User.findOne({
        username:req.body.username
         })
    if(existingUser){
    return res.status(411).json({message:"user already exist"})
    }
    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })
    const userId = user._id;
    const balance= 1 + Math.random()*1000
    await Account.create({
        userId,
        balance
        })
    
    const token = jwt.sign({
        userId:user._id
    },JWT_SECRET);

    res.json({
       balance: balance , message:"user cerated successfully",token:token
    })
})

    const signinBody = zod.object({
        username:zod.string().email(),
        password:zod.string()
    })
    router.post('/signin',async (req,res)=>{
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"wrong inputs"
        })
       
    }
    
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
        });
    if(user){
        const token = jwt.sign({
            userId:user._id},JWT_SECRET);
        res.json({message:"logged in successfully", token:token})
         return;
    }else if(!user){
        res.status(411).json({
            message:"user does not exist"
        })
    }else{
    res.status(411).json({
        message:"error while logging in"
    })}
})
const updateBody =  zod.object({
    // username: zod.string().email(),
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

router.put('/',authMiddleware,async (req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(302).json({
            message:"cannot update innfo"
        })
    }

   await User.updateOne(req.body,{
    _id : req.userId
   
   })
    res.status(400).send("updated successfully")
})


module.exports = router;