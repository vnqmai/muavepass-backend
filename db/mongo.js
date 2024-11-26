const mongoose = require('mongoose');
// require('dotenv').config();

module.exports = async () => {
    await mongoose.connect("mongodb+srv://vnqmaiblockchainlearning:U2iXJr958hrX6veb@cluster0.gha3k.mongodb.net/muavepass?retryWrites=true&w=majority&appName=Cluster0", {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
        .then(x => {
            console.log(
                `Connected to Mongo! Database name: "${x.connections[0].name}"`,
            );
        })
        .catch(err => {
            console.error('Error connecting to mongo', err);
        });
    return mongoose;
};