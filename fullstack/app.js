var express = require('express');
var app = express();
var port = process.env.PORT||8800;
var cors = require('cors');
var morgan = require('morgan');
var chalk = require('chalk');
var fs = require('fs');

var menu =[
  {name:'Home',link:'/'},
  {name:'Restaurant',link:'/restaurants'},
  {name:'City',link:'/city'},
  {name:'Contact',link:'/city'},
]

var restaurantRouter = require('./src/routes/restaurantsRouter')(menu)
var cityRouter = require('./src/routes/cityRouter')(menu)

//cors
app.use(cors())
//logs
app.use(morgan('tiny',{
  stream: fs.createWriteStream('mylogs.log',{flags:'a'})
}));

//Static File path
app.use(express.static(__dirname+'/public'))
//Html
app.set('views','./src/views')
//View engine
app.set('view engine','ejs')

app.get('/',function(req,res){
    //res.send('Hii From express')
    res.render('index',{title:'Home Page',menu})
});

app.use('/restaurants',restaurantRouter)
app.use('/city',cityRouter)

app.listen(port,function(err){
    if(err) throw err;
    console.log(chalk.gray('Server is running on port '+port))
})