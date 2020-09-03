var express = require('express');
const port = 5000;
const app = express();
var db = require('./db');

const AuthController = require('./auth/AuthController');
app.use('/api/auth',AuthController)

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})