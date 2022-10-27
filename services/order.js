var connection = require("../connection/connect.js")
var connect = connection.connection
let isValid = true;
let listErrors = [];

// lấy tất cả dữ liệu
const getAllData = (req, res) => {
    try {
        var sql = "select * from `order`";
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
        var sql = "select * from `order`" + ` where orderID = ${req.params.id}`;
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
        var sql = `delete from order where orderID = ${req.params.id}`;
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
            let procedure = `CALL proc_insertOrder(?,?,?,?,?)`;
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
            let procedure = `CALL proc_updateOrder(?,?,?,?,?)`;
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
    if (!data.PaymentID) {
        isValid = false;
        listErrors.push("Mã thanh toán không được để trống");
    }
    if (data.PaymentID) {
        if (!Number.isInteger(data.PaymentID)) {
            isValid = false;
            listErrors.push("Mã thanh toán phải là số nguyên");
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