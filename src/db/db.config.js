const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://SpookyBoi:Aqr6Tt0QgOgQ0qTl@cluster0.lozpuyb.mongodb.net/';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Successful connection to MongoDB.');
});