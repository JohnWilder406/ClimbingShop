const mongoose = require('mongoose');
const dbName1 = process.env.DB_NAME1;

mongoose.connect('mongodb://127.0.0.1/' + dbName1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Established a connection to the ${dbName1} database`))
    .catch(err => console.log(`Something went wrong with connecting to the database`, err))