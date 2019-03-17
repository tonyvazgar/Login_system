const mysqlImporter = require('mysql-import');
const mysql = require('mysql');

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
exports.createDB = function () {
    importer.import('db.sql').then(() => {
        console.log("La base de datos ha sido importada! :)");
    });
}

const connection = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'loginSystem'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

/*
 *Seleccionar todos los usuarios
 */
exports.selectAllFrom = function (table) {
    connection.query("SELECT * FROM " + table, (err, rows) => {
        if(err) throw err;
        console.log('Datos recividos para la query de ' + table +  ':\n');
        console.log(rows);
    });
}

/*
 *Seleccionar usuario especifico
 */
exports.selectUser = function(user) {
    var query = "SELECT * FROM users WHERE user_id = '" + user + "'";
    console.log(query);
    connection.query( query, (err, rows) => {
        if(err) throw err;
        console.log("Datos de " + user + ":\n");
        console.log(rows);
    });
}