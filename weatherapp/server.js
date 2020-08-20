/*var express = require('express');
var request = require('request');*/
import express from 'express';
import request from 'request';
const app = express();
const port = 7800;

const apiUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Mumbai&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29";

//Static File path
app.use(express.static(__dirname+'/public'))
//Html
app.set('views','./src/views')
//View engine
app.set('view engine','ejs')

app.get('/weather',(req,res) => {
    request(apiUrl,(err,response) => {
        if(err) throw err;
        const output = JSON.parse(response.body)
        res.render('weather',{title:'Weather App',result:output})
    })
})


app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})