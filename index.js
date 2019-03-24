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

app.get('/home', function (request, response) {
    response.sendFile(path.join(__dirname + '/public/home.html'));
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/log', function (request, response) {
    console.error("\nHaciendo post!!\n");
    var username = request.body.username;
    var password = request.body.password;
    console.log(username + "--" + password);
    var query = 'SELECT * FROM users WHERE user_id = ' + username + ' AND pass = ' +  password
    console.log('***********' + query)
    if(username && password){
        //db.selectUser(username)
        db.connection.query('SELECT * FROM users WHERE user_id = ? AND pass = ?', [username, password], function (error, results, fields) {
            console.log("Los resultados de la query son: " + results)
            if (results.length > 0){
                response.redirect('/public/home.html');
            }else{
                response.redirect('/')  //Redirección a pagina de login
            }
        })
    }
});

app.listen(3001, () => {
    console.log('App running on port 3001')
})