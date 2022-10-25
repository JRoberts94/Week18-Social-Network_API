const express = require('express'); 
const db = require('./config/connection');
const router = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( router);

// sync sequelize models to the database, then turn on the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});