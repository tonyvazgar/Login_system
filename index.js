var express     = require('express');
var db          = require('./db/dbLibrary.js');
var bodyParser  = require('body-parser');
var path        = require('path');
var session     = require('express-session');
var app         = express();

// db.createDB();
// db.selectUser("tony");
// db.selectAllFrom("users");
// db.selectAllFrom("rol");
// db.selectAllFrom("permission");
// db.selectUser("root");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'auri',
    resave: true,
    saveUninitialized: true
}));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/public/login.html'));
});
app.use(express.static(path.resolve('./public')));
app.use(express.static(path.resolve('./db')));

app.get('/home', function (request, response) {
    if(request.session.loggedin){
        response.sendFile(__dirname + '/public/home.html');
        console.log('The user is already logged!');
    }else{
        response.redirect('/flog');
        console.log('The user must be logged!');
    }
    // response.end();
});

app.post('/log', function (request, response) {
    console.error("\nHaciendo post!!\n");
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        db.connection.query('SELECT * FROM users WHERE user_id = ? AND pass = ?', [username, password], function (error, results, fields) {
            console.log("Los resultados de la query son: ", results);
            if (results.length > 0) {
                console.log("Login success!");
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                console.log("Password error, try again!");
                response.redirect('/flog');
            }
            response.end();
        });
    } else {
        console.log('Ingresa tus datos!!!');
        response.redirect('/flog');
    }
});

app.get('/flog', (request, response) => {
    response.sendFile(path.join(__dirname + '/public/login.html'));
});

app.listen(3001, () => {
    console.log('Acceso desde: http://localhost:3001')
});