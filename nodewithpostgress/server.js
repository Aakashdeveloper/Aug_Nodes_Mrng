var express = require('express')
const app = express();
const port = 8700;
const Pool = require('pg').Pool;
var pool = new Pool({
    user:'postgres',
    host:'Host ip of db',
    database:"dbname",
    password:"",
    port:'5432'
})


app.get('/user',(req,res) => {
    pool.query('Select * from emp',(er,data) => {
        if(err){
            throw err
        }else{
            res.status(200).send(data.rows)
        }
    })
})

app.post('/user',(req,res) => {
    let fname = req.body.fname;
    let roll = req.body.roll;
    pool.query('Insert into "emp"(fname,roll) VALUES ($1,$2);',[fname,roll],(err,result) => {
        if(err){
            throw err
        }
        res.status(200).send('data added')
    })
})

app.listen(port,() => {
    console.log('Serve is running on port 8700')
})