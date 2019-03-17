const express = require('express');
const app = express()
const db  = require('./db/dbLibrary.js');

db.createDB();
db.selectUser("tony");
db.selectAllFrom("users");
db.selectAllFrom("rol");
db.selectAllFrom("permission");
db.selectUser("root");

app.listen(3000, () => {
    console.log('App running on port 3000')
})