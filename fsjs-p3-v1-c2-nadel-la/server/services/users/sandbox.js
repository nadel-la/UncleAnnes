const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://nadellaayudhia:SjXmLXXbr1svhaW7@challenge3.ujelcoh.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("c3p3_test");
    const movies = database.collection("users");

    // Query for a movie that has the title 'Back to the Future'
    const query = { firstName: "mikasa" };
    const users = await movies.findOne(query);

    console.log(users);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
