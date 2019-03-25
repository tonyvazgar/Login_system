var mysqlImporter = require('mysql-import');
var mysql = require('mysql');

/*
 *Para importar el archivo db.sql en mySQL a traves de MAMP
 */
var importer = mysqlImporter.config({
    database: 'mysql',
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock', //for mac and linux
    onerror: err => console.log(err.message)
});


const connection = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'loginSystem'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos!');
    connection.query("CREATE DATABASE IF NOT EXISTS loginSystem", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});
importer.import('./db/db.sql').then(() => {
    console.log("La base de datos ha sido importada! :)");
});

/*
 *Seleccionar todos los usuarios
 */
exports.selectAllFrom = function (table) {
    connection.query("SELECT * FROM " + table, (err, rows) => {
        if (err) throw err;
        console.log('Datos recividos para la query de ' + table + ':\n');
        console.log(rows);
    });
}

/*
 *Seleccionar usuario especifico
 */
exports.selectUser = function (user) {
    var query = "SELECT * FROM users WHERE user_id = '" + user + "'";
    //console.log(query);
    //var response;
    connection.query(query, (err, rows) => {
        if (err) throw err;
        console.log("Datos de " + user + ":\n");
        console.log(rows);
        //response = rows;
    });
    //return resizeBy
}

exports.userExists = function (user, pass) {
    var exists = false;
    connection.query('SELECT * FROM users WHERE user_id = ? AND pass = ?', [username, password], function (error, results, fields) {
        if (results.length > 0) {
            exists = true;
        }
    });
    return exists
}


module.exports = {
    connection
}