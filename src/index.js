// to access env variable :
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI
// create a client object we can run methods on 
const client = new MongoClient(process.env.MONGO_URI);

const connection = async () => {
    try {
        // connect to mongo db, the client now has access to additional menthods
        await client.connect();
        const db = client.db("sample_mflix");
        const movies = db.collection("movies")

        // read
        const query = { title: 'Back to the Future' };
        const movie = await movies.findOne(query);
        // console.log(movie);

        // read
        const allMovies = await movies.find().toArray()
        console.log(allMovies.length);

        return movie

    } catch (error) {
        // Ensures that the client will close when you finish/error
        console.log(error);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

connection()
//   connection().catch(console.dir);
