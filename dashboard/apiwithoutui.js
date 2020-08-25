const express = require('express');
const app = express();
const mongo = require('mongodb');
const port = process.env.PORT || 9700;
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const mongoUrl = "mongodb://localhost:27017";
let db;

app.use(cors())
app.use(morgan('tiny',{
    stream: fs.createWriteStream('mylogs.log',{flags:'a'})
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.status(200).send('HealthCheck')
})

///Post Data(create)
app.post('/addUser',(req,res) => {
    db.collection('users').insert(req.body,(err,result) => {
        if(err){
            throw err
        }else{
            res.send('Data Added')
        }
    })
});

//Get Data(read)
app.get('/users',(req,res) => {
    var query = {}
    if(req.query.id){
        query = {_id:parseInt(req.query.id),active:true}
    }else if(req.query.city){
        query = {city:req.query.city,active:true}
    }
    else{
        query = {active:true}
    }
    db.collection('users').find(query).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
});

//updateUser
app.put('/updateUser',(req,res) => {
    db.collection('users').update(
        {_id:parseInt(req.body._id)},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                active:true
            }
        },(err,result) => {
            if(err){
                throw err
            }else{
                res.send('Data Updated')
            }
        }
    )
})


//Delete User
app.delete('/deleteUser',(req,res) => {
    db.collection('users').remove({_id:parseInt(req.body.id)},(err,result) => {
        if(err){
            throw err
        }else{
            res.send('Data Deleted')
        }
    })
})

MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log(err);
    db= client.db('nodeaug');
    app.listen(port,(err) => {
        console.log(`Server is running on port ${port}`)
    })
})