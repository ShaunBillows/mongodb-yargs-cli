const log = require('./funky-log')

class Movie {

    constructor(title, actor="none specified") {
        this.title = title
        this.actor = actor
    }
    async add(collection) {
        if (this.title && this.title !== true){
          const result = await collection.insertOne(this);
          log(`A document was inserted with the _id: ${result.insertedId}`);
          return
        }
        log('Each entry must have a title.  No document added.');
    }
    async update(collection, replacement) {
        const result = await collection.replaceOne(this, replacement)
        if (result.matchedCount === 1) {
            log("Successfully updated one document.");
          } else {
            log("No documents matched the query. Updated 0 documents.");
          }
    }
    async remove(collection) {
        const result = await collection.deleteOne(this)
        if (result.deletedCount === 1) {
            log("Successfully deleted one document.");
          } else {
            log("No documents matched the query. Deleted 0 documents.");
          }
    }
}

module.exports = Movie