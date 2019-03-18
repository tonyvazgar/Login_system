const express = require('express');
const app = express()
const db  = require('../db/dbLibrary.js');
var path = require('path');

// db.createDB();
// db.selectUser("tony");
// db.selectAllFrom("users");
// db.selectAllFrom("rol");
// db.selectAllFrom("permission");
// db.selectUser("root");

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/public/login.html'));
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('App running on port 3000')
})