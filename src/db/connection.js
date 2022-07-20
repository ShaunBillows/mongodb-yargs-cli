// to access env variable :
require("dotenv").config();

const { MongoClient } = require('mongodb');

// create a client object we can run methods on 
const client = new MongoClient(process.env.MONGO_URI);

const connection = async () => {
    try {
        console.log('making conection...');
        // connect to mongo db, the client now has access to additional menthods
        await client.connect();
        const db = client.db("movies");
        return db.collection("movie")
        
    } catch (error) {
        // Ensures that the client will close when you finish/error
        console.log(error);
    } 
  }

  module.exports = { client, connection }