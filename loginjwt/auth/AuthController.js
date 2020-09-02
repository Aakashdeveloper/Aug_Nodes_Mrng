const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcryptjs');
const config = require('../config');
const User = require('./UserSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//Register
router.post('/register',(req,res) => {
    var hashedpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword,
        role:req.body.role?req.body.role:'User'
    },(err,user) => {
        if(err) return res.status(500).send("Error in register");
        res.setHeader('Access-Control-Allow-Origin','*')
        res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept')
        res.status(200).send("Registration successful");
    })
})


//login
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.status(500).send("Error on server")
        if(!user) return res.status(404).send('No User found');
        else{
            const passIsValid = bcrpyt.compareSync(req.body.password,user.password)
            if(!passIsValid) return res.status(401).send({auth:false,token:null});
            var token = jwt.sign({id:user._id},config.secert,{expiresIn:86400});
            res.send({auth:true,token:token})
        }
    })
});

//getUSerInfo
router.get('/userInfo',(req,res) => {
    var token  = req.headers['x-access-token']
    if(!token) res.status(401).send({auth:false,token:'No Token Provided'})
    jwt.verify(token,config.secert,(err,data) => {
        if(err) return res.status(500).send("Error")
        User.findById(data.id,{password:0},(err,user) => {
            if(err) return res.send('Error finding user')
            if(!user) return res.send("No User found")
            res.send(user)
        })
    })
})

///Get All users
router.get('/users',(req,res) => {
    User.find({},(err,user) => {
        if(err) throw err;
        res.send(user)
    })
})


module.exports = router;