const graphql = require('graphql');
const axios = require('axios');

const{
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
} = graphql

const ProductType = new GraphQLObjectType({
    name:'Product',
    fields:{
        id: {type:GraphQLInt},
        name: {type:GraphQLString},
        city:  {type:GraphQLString},
        locality:  {type:GraphQLString},
        thumb:  {type:GraphQLString},
        aggregate_rating:  {type:GraphQLString},
        rating_text:  {type:GraphQLString},
        min_price: {type:GraphQLInt}
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        product:{
            type:ProductType,
            args:{id:{type:GraphQLInt}},
            resolve(parentValue,args){
                return axios.get(`http://localhost:8900/products/${args.id}`)
                .then((res) => res.data)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addProduct:{
            type:ProductType,
            args:{
                id: {type:GraphQLInt},
                name: {type:GraphQLString},
                city:  {type:GraphQLString},
                locality:  {type:GraphQLString},
                thumb:  {type:GraphQLString},
                aggregate_rating:  {type:GraphQLString},
                rating_text:  {type:GraphQLString},
                min_price: {type:GraphQLInt}
            },
            resolve(parentValue,{id,name,city,locality,thumb,rating_text,min_price,aggregate_rating}){
                return axios.post(`http://localhost:8900/products`,{id,name,city,locality,thumb,rating_text,min_price,aggregate_rating})
                .then((res) => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:mutation
})