const Movie = require("./utils")
const yargs = require("yargs")
const { client, connection } = require("./db/connection")

const app = async (yargsObj) => {

    const collection = await connection()

    if (yargsObj.create) {
        console.log(yargsObj);
        const newMovie = new Movie(yargsObj.title, yargsObj.actor)
        await newMovie.add(collection)
        
    } else if (yargsObj.read) {
        await collection.find().toArray()

    } else if (yargsObj.update) {
        const query = new Movie(yargsObj.oldTitle, yargs.oldActor)
        const replacement = new Movie(yargsObj.newTitle, yargsObj.newActor)
        await query.update(collection, replacement)

    } else if (yargsObj.remove) {
        const query = new Movie(yargsObj.title, yargsObj.actor)
        await query.remove(collection)

    } else {
        console.log("Incorrect command");
    }
    
    await client.close()
}

app(yargs.argv)

// node src/app --read   
// node src/app --remove --title "movie1" --actor "actor 1"
// node src/app --update --oldTitle "hi" --newTitle "bye" --newActor "bye"