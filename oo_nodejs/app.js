const express = require('express');
const port = 9700;
const app = express();
let database = require('./database');


app.get('/mydata',(req,res) => {
    let output = database.getData('first');
    res.send(output)
});

app.post('/mydata',(req,res) => {
    var mydata={"name":"Alvin","class":"Node"}
    let output = database.postData('first',mydata);
    res.send(output)
})

app.listen(port,(err) => {
    console.log(`Server is running on port ${port}`)
})