var connection = require("../connection/connect.js")
var connect = connection.connection
let isValid = true;
let listErrors = [];

// lấy tất cả dữ liệu
const getAllData = (req, res) => {
    try {
        var sql = "select * from orderDetail";
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
        var sql = `select * from orderDetail where orderDetailID = ${req.params.id}`;
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
        var sql = `delete from orderDetail where orderDetailID = ${req.params.id}`;
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
            let procedure = `CALL proc_insertOrderDetail(?,?,?,?,?)`;
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
            let procedure = `CALL proc_updateOrderDetail(?,?,?,?,?)`;
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
    if (!data.OrderID) {
        isValid = false;
        listErrors.push("Mã đơn bán không được để trống");
    }
    if (data.OrderID) {
        if (!Number.isInteger(data.OrderID)) {
            isValid = false;
            listErrors.push("Mã đơn bán phải là số nguyên");
        }
    }
    if (!data.ProductID) {
        isValid = false;
        listErrors.push("Mã sản phẩm không được để trống");
    }
    if (data.ProductID) {
        if (!Number.isInteger(data.ProductID)) {
            isValid = false;
            listErrors.push("Mã sản phẩm phải là số nguyên");
        }
    }
    if (!data.Quatity) {
        isValid = false;
        listErrors.push("Số lượng không được để trống");
    }
    if (data.Quatity) {
        if (!Number.isInteger(data.Quatity)) {
            isValid = false;
            listErrors.push("Số lượng phải là số nguyên");
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