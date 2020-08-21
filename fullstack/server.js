var express = require('express');
var app = express();
var port = process.env.PORT||9800;

app.get('/',function(req,res){
    res.send('Hii From express')
})


app.listen(port,function(err){
    if(err) throw err;
    console.log('Server is running on port '+port)
})