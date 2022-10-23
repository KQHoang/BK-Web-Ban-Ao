var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: "localhost",
    user: "QuangHoang",
    password: "123",
    database: "quanlywebbanao",
    port: 3306
});

var connectMySql = () => connection.connect(function(err) {
    if (err)
        console.log("Kết nối thất bại", err);
    else
        console.log("kết nối thành công");
});

module.exports = {
    connection,
    connectMySql
}