var connection = require("../connection/connect.js")
var connect = connection.connection

// lấy tất cả dữ liệu
const getAllData = (req, res) => {
    try {
        var sql = "select * from purchasedetail";
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
        var sql = `select * from purchasedetail where purchaseDetailID = ${req.params.id}`;
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
const deleteRecord = (req, res) => {
    try {
        var sql = `delete from purchasedetail where purchaseDetailID = ${req.params.id}`;
        connect.query(sql, function(err, data) {
            if (err)
                res.status(400).json(err)
            res.status(200).json(1)
        });
    } catch (error) {
        console.log(error);
    }
}

// thêm mới
const insertRecord = (req, res) => {
    try {
        var values = Object.values(req.body);
        let procedure = `CALL proc_insertPurchaseDetail(?,?,?,?,?)`;
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
const updateRecord = (req, res) => {
    try {
        var values = Object.values(req.body);
        let procedure = `CALL proc_updatePurchaseDetail(?,?,?,?,?)`;
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
    deleteRecord,
    insertRecord,
    updateRecord
}