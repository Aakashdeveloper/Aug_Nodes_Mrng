const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const dbname="classpractice";

const MainCall = {};

var output;
MainCall.getData = (colName) => {
    MongoClient.connect(url,(err,client) => {
        if(err)throw err;
        var dbo = client.db(dbname);
        dbo.collection(colName).find({}).toArray((err,result) => {
            if(err) throw err;
            console.log('Data fetched');
            output = result;
        });
    });
    return output;
}


MainCall.postData = (colName,dbObj) => {
    MongoClient.connect(url,(err,client) => {
        if(err)throw err;
        var dbo = client.db(dbname);
        dbo.collection(colName).insert({dbObj},(err,result) => {
            if(err) throw err;
            console.log('Data fetched');
        });
    });
    let out = `Data Added in collection ${colName}`
    return out;
}

module.exports = MainCall