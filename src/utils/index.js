class Movie {

    constructor(title, actor="none specified") {
        this.title = title
        this.actor = actor
    }
    async add(collection) {
        if (this.title && this.title !== true){
          const result = await collection.insertOne(this);
          console.log(`A document was inserted with the _id: ${result.insertedId}`);
          return
        }
        console.log('Each entry must have a title.  No document added.');
    }
    async update(collection, replacement) {
        const result = await collection.replaceOne(this, replacement)
        if (result.matchedCount === 1) {
            console.log("Successfully updated one document.");
          } else {
            console.log("No documents matched the query. Updated 0 documents.");
          }
    }
    async remove(collection) {
        const result = await collection.deleteOne(this)
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
          } else {
            console.log("No documents matched the query. Deleted 0 documents.");
          }
    }
}

module.exports = Movie