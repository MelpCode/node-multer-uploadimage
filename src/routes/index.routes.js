const express = require('express');

const router = express.Router();

router.get('/index/',(req,res)=>{
    res.render('index')
})

router.post('/upload/',(req,res)=>{
    console.log(req.file);
    res.render('sucess')
})

module.exports = router;