const express = require('express');
//const expressGraphQL = require("express-graphql");
const {graphqlHTTP} = require("express-graphql");
const port = 8600;
const app = express();
var schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})