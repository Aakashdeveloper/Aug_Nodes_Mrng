 var express = require('express');
 var app = express();
 var superagent = require('superagent');
 var request = require('request');
 var port = 9800;

app.use(express.static(__dirname+'/public'));
app.set('views','./src');
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('index')
});

app.get('/user',(req,res) => {
    const {code} = req.query;
    console.log("Value of code is "+code)
    if(!code){
        res.send({
            success:false,
            message:'Error on login'
        })
    }

    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:"aab6a282d77f2c8d7ae2",
            client_secret:'bf87696253362326eaafca8e850fdf2467d4299a',
            code:code          
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            var accesstoken = result.body.access_token
            const option = {
                url: 'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization':`token ${accesstoken}`,
                    'User-Agent':'aug-node'
                }
            }
            var ouput;
            request(option,(err,response,body) => {
                output = body;
                return res.send(output)
            })
        })
})


app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})