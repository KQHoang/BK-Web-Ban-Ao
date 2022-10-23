const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json())

var cors = require('cors')
app.use(cors()) // Use this after the variable declaration

// Khai báo kết nối
// kết nối 
var connection = require("./connection/connect.js")
connection.connectMySql();
var con = connection.connection;


// error hander function
app.use((error, req, res) => {
    const err = app.get('env') === 'development' ? error : {}
    const status = error.status || 500

    return res.status(status).json({
        err: {
            message: err.message
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})