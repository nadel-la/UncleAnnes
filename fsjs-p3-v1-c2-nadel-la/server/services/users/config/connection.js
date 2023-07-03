const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://nadellaayudhia:SjXmLXXbr1svhaW7@challenge3.ujelcoh.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let db;

async function connect() {
  try {
    const database = "c3p3_test";
    db = client.db(database);

    // return db;
  } catch (error) {
    console.log(error);
  }
}

function getDb() {
  return db;
}

module.exports = { connect, getDb };
