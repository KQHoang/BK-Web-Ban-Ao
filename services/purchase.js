var connection = require("../connection/connect.js")
var connect = connection.connection
let isValid = true;
let listErrors = [];
// lấy tất cả dữ liệu
const getAllData = (req, res) => {
    try {
        var sql = "select * from purchase";
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
        var sql = `select * from purchase where purchaseID = ${req.params.id}`;
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
        var sql = `delete from purchase where purchaseID = ${req.params.id}`;
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
            let procedure = `CALL proc_insertPurchase(?,?,?,?)`;
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
            let procedure = `CALL proc_updatePurchase(?,?,?,?)`;
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
    if (!data.AccountID) {
        isValid = false;
        listErrors.push("Mã tài khoản không được để trống");
    }
    if (data.AccountID) {
        if (!Number.isInteger(data.AccountID)) {
            isValid = false;
            listErrors.push("Mã tài khoản phải là số nguyên");
        }
    }
    if (!data.SupplierID) {
        isValid = false;
        listErrors.push("Mã nhà cung cấp không được để trống");
    }
    if (data.SupplierID) {
        if (!Number.isInteger(data.SupplierID)) {
            isValid = false;
            listErrors.push("Mã nhà cung cấp phải là số nguyên");
        }
    }
}
module.exports = {
    getAllData,
    getByID,
    deleteRecord,
    insertRecord,
    updateRecord
}