const express = require('express')
const zod = require('zod');
const { User } = require('../db');
// const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

const router = express.Router();


router.use(authMiddleware)
router.get('/',async (req,res)=>{
    const filter = req.query.filter || "" ;
    const fusers = await User.find({
        $or: [{
            firstName:{
                "$regex": filter
            }},{
                lastName:{
                    "$regex":filter
                }
           
        }]
    })
    // console.log(req.userId)
    const users = fusers.filter((users)=>{
        return req.userId != users._id
    })
    res.json({
        user: users.map(user => ({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})
module.exports = router