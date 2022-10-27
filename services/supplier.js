var connection = require("../connection/connect.js")
var connect = connection.connection
let isValid = true;
let listErrors = [];
// lấy tất cả dữ liệu
const getAllData = (req, res) => {
    try {
        var sql = "select * from supplier";
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
        var sql = `select * from supplier where supplierID = ${req.params.id}`;
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
        var sql = `delete from supplier where supplierID = ${req.params.id}`;
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
        validateData(req.body);
        if (!isValid) {
            res.status(400).json(listErrors)
        } else {
            var values = Object.values(req.body);
            let procedure = `CALL proc_insertSupplier(?,?,?,?)`;
            connect.query(procedure, values, function(err, data) {
                if (err)
                    res.status(400).json(err)
                res.status(201).json(1)
            });
        }
        listErrors = [];
        isValid = true;
    } catch (error) {
        console.log(error);
    }
}

// cập nhật
const updateRecord = (req, res) => {
    try {
        validateData(req.body);
        if (!isValid) {
            res.status(400).json(listErrors)
        } else {
            var values = Object.values(req.body);
            let procedure = `CALL proc_updateSupplier(?,?,?,?)`;
            connect.query(procedure, values, function(err, data) {
                if (err)
                    res.status(400).json(err)
                res.status(200).json(1)
            });
        }
        listErrors = [];
        isValid = true;
    } catch (error) {
        console.log(error);
    }
}

function validateData(data) {
    if (!data.SupplierName) {
        isValid = false;
        listErrors.push("Tên nhà cung không được để trống");
    }
}
module.exports = {
    getAllData,
    getByID,
    deleteRecord,
    insertRecord,
    updateRecord
}