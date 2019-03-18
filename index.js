const express = require('express');
const app = express()
const db = require('./db/dbLibrary.js');
var bodyParser = require('body-parser');
var path = require('path');

// db.createDB();
// db.selectUser("tony");
// db.selectAllFrom("users");
// db.selectAllFrom("rol");
// db.selectAllFrom("permission");
// db.selectUser("root");

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/public/login.html'));
});
app.use(express.static(path.resolve('./public')));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/log', function (request, response) {
    console.error("\nHaciendo post\n");
    var username = request.body.username;
    var password = request.body.password;
    console.log(username + "--" + password);
});

app.listen(3001, () => {
    console.log('App running on port 3001')
})