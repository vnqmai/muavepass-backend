
const mongoose = require('mongoose');
// const uri = process.env.MONGO_DB;
const uri = "mongodb+srv://vnqmaiblockchainlearning:U2iXJr958hrX6veb@cluster0.gha3k.mongodb.net/muavepass?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const db = mongoose.connection;
mongoose.connect(uri, clientOptions);
db.on('error', (err) => {
  console.log('DB connection error:', err.message);
})
// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);
