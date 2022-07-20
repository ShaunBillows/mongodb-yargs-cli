const Movie = require("./utils")
const yargs = require("yargs")
const { client, connection } = require("./db/connection")
const log = require('./utils/funky-log')

const app = async (yargsObj) => {

    const collection = await connection()

    if (yargsObj.create) {
        const newMovie = new Movie(yargsObj.title, yargsObj.actor)
        await newMovie.add(collection)
        
    } else if (yargsObj.read) {
        const results = await collection.find().toArray()
        console.table(results)

    } else if (yargsObj.update) {
        const query = new Movie(yargsObj.oldTitle, yargsObj.oldActor)
        const replacement = new Movie(yargsObj.newTitle, yargsObj.newActor)
        await query.update(collection, replacement)

    } else if (yargsObj.remove) {
        const query = new Movie(yargsObj.title, yargsObj.actor)
        await query.remove(collection)

    } else if (yargsObj.erase) {
        await collection.deleteMany({})

    } else {
        log("Incorrect command");
    }
    
    await client.close()
}

app(yargs.argv)