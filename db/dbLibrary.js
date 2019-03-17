const mysqlImporter = require('mysql-import');

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


exports.createDB = function(){
    importer.import('db.sql').then(() => {
        console.log("La base de datos ha sido importada! :)");
    });
}