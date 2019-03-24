var express = require('express');
var app = express()
var db = require('./db/dbLibrary.js');
var bodyParser = require('body-parser');
var path = require('path');

// db.createDB();
// db.selectUser("tony");
// db.selectAllFrom("users");
// db.selectAllFrom("rol");
// db.selectAllFrom("permission");
// db.selectUser("root");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/public/login.html'));
});
app.use(express.static(path.resolve('./public')));

app.get('/home', function (request, response) {
    response.sendFile(path.join(__dirname + '/public/home.html'));
});

app.post('/log', function (request, response) {
    console.error("\nHaciendo post!!\n");
    var username = request.body.username;
    var password = request.body.password;
    console.log(username + "--" + password);

    if (username && password) {
        db.connection.query('SELECT * FROM users WHERE user_id = ? AND pass = ?', [username, password], function (error, results, fields) {
            console.log(results);
            if (results.length > 0) {
                response.redirect('/home');
            } else {
                //response.send('Usuario y contraseña erroneos!');
                response.redirect('/flog');
            }
            response.end();
        });
    }
});

app.get('/flog', (request, response) => {
    response.sendFile(path.join(__dirname + '/public/login.html'));
});

app.listen(3001, () => {
    console.log('Acceso desde: http://localhost:3001')
});