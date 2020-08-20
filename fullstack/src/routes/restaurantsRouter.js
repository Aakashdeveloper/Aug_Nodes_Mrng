var express = require('express');
var restaurantRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

function Router(menu){
    restaurantRouter.route('/')
    .get(function(req,res){
      mongodb.connect(url,function(err,dc){
        if(err){
          res.status(501).send('Error while connecting')
        }else{
          const dbo= dc.db("nodeaug");
          dbo.collection('restaurants').find({}).toArray((err,data) => {
            if(err){
              res.status(501).send('Error while fetching')
            }else{
              res.render('restaurant',{title:'Restaurants Page',data:data,menu:menu})
            }
          })
        }
      })
    })
  
    restaurantRouter.route('/details/:id/:name')
        .get(function(req,res){
        //var id = req.params.id;
        var {id} = req.params
        var {name} = req.params
        mongodb.connect(url,function(err,dc){
          if(err){
            res.status(501).send('Error while connecting')
          }else{
            const dbo= dc.db("nodeaug");
            dbo.collection('restaurants').findOne({id:id},(err,data) => {
              if(err){
                res.status(501).send('Error while fetching')
              }else{
                res.render('restaurantDetails',{title:'Restaurants Page',data:data,menu:menu})
              }
            })
          }
        })
    })
    
    return restaurantRouter
}

module.exports = Router;