var connection = require("../connection/connect.js")
var connect = connection.connection

// lấy tất cả dữ liệu
const getAllData = (req, res) => {
    try {
        var sql = "select * from product";
        connect.query(sql, function(err, data) {
            if (err)
                res.status(400).json(err)
            res.status(200).json(data)
        });
    } catch (error) {
        console.log(error);
    }
}

// lấy theo ID
const getByID = (req, res) => {
    try {
        var sql = `select * from product where productID = ${req.params.id}`;
        connect.query(sql, function(err, data) {
            if (err)
                res.status(400).json(err)
            res.status(200).json(data)
        });
    } catch (error) {
        console.log(error);
    }
}

// xoá
const deleteProduct = (req, res) => {
    try {
        var sql = `delete from product where productID = ${req.params.id}`;
        connect.query(sql, function(err, data) {
            if (err)
                res.status(400).json(err)
            res.status(200).json(1)
        });
    } catch (error) {
        console.log(error);
        res.status(200).json(0)
    }
}

// thêm mới
const insertProduct = (req, res) => {
    try {
        var values = Object.values(req.body);
        let procedure = `CALL proc_insertProduct(?,?,?,?,?,?,?,?)`;
        connect.query(procedure, values, function(err, data) {
            if (err)
                res.status(400).json(err)
            res.status(201).json(1)
        });
    } catch (error) {
        console.log(error);
    }
}

// cập nhật
const updateProduct = (req, res) => {
    try {
        var values = Object.values(req.body);
        let procedure = `CALL proc_updateProduct(?,?,?,?,?,?,?,?)`;
        connect.query(procedure, values, function(err, data) {
            if (err)
                res.status(400).json(err)
            res.status(200).json(1)
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getAllData,
    getByID,
    deleteProduct,
    insertProduct,
    updateProduct
}