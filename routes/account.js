const express = require('express');
const { Account, User } = require('../db');
const { authMiddleware } = require('../middleware');
const mongoose = require('mongoose');

const router = express.Router();
router.use(authMiddleware)

router.get('/balance',async (req,res)=>{
    const Balance = await Account.findOne({
        
        userId : req.userId
    })
    const me = await User.findOne({
        _id : req.userId
    })
    // console.log(req.userId)
    // console.log(me)
    res.status(200).json({
        Balance: Balance.balance,
        firstName:me.firstName
    })
})

router.post('/transfer', async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction() ;

    const {ammount , to} = req.body

    await Account.findOne({userId : req.userId}).session(session);
    if(!Account || !Account.balance < ammount){
          await session.abortTransaction() 
          return res.status(400).json({"message": 'insufficient balance'})
    }
//finding account to transfer
    const toAccount = Account.findOne({userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        res.status(200).json({message:'Invalid Account'})
    }
// performing to transection
  await Account.updateOne({userId : req.userId} ,{ $inc: { balance: -ammount }}).session(session)
  await Account.updateOne({ userId: to },{ $inc : { balance : ammount } }).session(session)

  // commiting the transfer

  await session.commitTransaction();
  res.json({
    message:'transfer successfull'
  })
})

module.exports = router;