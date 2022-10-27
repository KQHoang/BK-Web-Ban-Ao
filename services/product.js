var connection = require("../connection/connect.js")
var connect = connection.connection
let isValid = true;
let listErrors = [];
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
        validateData(req.body);
        if (!isValid) {
            res.status(400).json(listErrors)
        } else {
            var values = Object.values(req.body);
            let procedure = `CALL proc_insertProduct(?,?,?,?,?,?,?,?)`;
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
const updateProduct = (req, res) => {
    try {
        validateData(req.body);
        if (!isValid) {
            res.status(400).json(listErrors)
        } else {
            var values = Object.values(req.body);
            let procedure = `CALL proc_updateProduct(?,?,?,?,?,?,?,?)`;
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
    if (!data.ProductName) {
        isValid = false;
        listErrors.push("Tên sản phẩm không được để trống");
    }
    if (!data.CategoryID) {
        isValid = false;
        listErrors.push("Mã danh mục không được để trống");
    }
    if (data.CategoryID) {
        if (!Number.isInteger(data.CategoryID)) {
            isValid = false;
            listErrors.push("Mã danh mục phải là số");
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
    deleteProduct,
    insertProduct,
    updateProduct
}