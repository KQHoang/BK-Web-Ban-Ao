const { query } = require("express");
var connection = require("../connection/connect.js")
var connect = connection.connection
const queryString = require('query-string')

let isValid = true;
let isDuplicate
let listErrors = [];
// lấy tất cả dữ liệu
const getAllData = (req, res) => {
    try {
        var sql = "select * from account";
        connect.query(sql, function(err, data) {
            if (err)
                res.status(400).json(err)
            res.status(200).json(data)
        });
    } catch (error) {
        console.log(error);
    }
}

// phân trang
const getDataPaging = async(req, res) => {
    try {
        let paging = require('url').parse(req.url, true).query;
        let values = Object.values(paging);
        // lấy tài khoản
        const result = {};
        let procedure = `CALL Proc_pagingAccount(?, ?, ?)`;
        connect.query(procedure, values, function(err, data) {
            if (err)
                res.status(400).json(err)
            result.data = data[0];
            // lấy tổng số bản ghi
            let procGetTotalRecord = `CALL Proc_getTotalRecordAccount`;
            connect.query(procGetTotalRecord, function(err, data) {
                if (err)
                    res.status(400).json(err);
                var totalRecord = data[0];
                result.totalRecord = totalRecord[0].ToTal;
                res.status(200).json(result);
            });
        });
    } catch (error) {
        console.log(error);
    }
}

// lấy theo ID
const getByID = (req, res) => {
    try {
        var sql = `select * from account where accountID = ${req.params.id}`;
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
        var sql = `delete from account where accountID = ${req.params.id}`;
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
const insertRecord = async(req, res) => {
    try {
        await validateInsert(req.body);
        if (!isValid) {
            res.status(400).json(listErrors)
        } else {
            var values = Object.values(req.body);
            let procedure = `CALL proc_insertAccount(?,?,?,?,?,?,?)`;
            await connect.query(procedure, values, function(err, data) {
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
const updateRecord = async(req, res) => {
    try {
        await validateData(req.body);
        if (!isValid) {
            res.status(400).json(listErrors);
        } else {
            var values = Object.values(req.body);
            let procedure = `CALL proc_updateAccount(?,?,?,?,?,?,?)`;
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

async function checkDuplicateEmail(email) {
    isDuplicate = false;
    var sql = `select * from account where email = "` + email + `"`;
    await connect.promise().
    query(sql).
    then(([rows, fields]) => {
        if (rows.length != 0) {
            isDuplicate = true;
        }
    }).catch().then()
}

function validateData(data) {
    if (!data.FirstName) {
        isValid = false;
        listErrors.push("Tên người dùng không được để trống");
    }
    if (!data.LastName) {
        isValid = false;
        listErrors.push("Họ đệm người dùng không được để trống");
    }
    if (!data.Email) {
        isValid = false;
        listErrors.push("Email không được để trống");
    }
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(data.Email)) {
        isValid = false;
        listErrors.push("Email không đúng định dạng");
    }
    if (!data.Password) {
        isValid = false;
        listErrors.push("Mật khẩu không được để trống");
    }
    if (!data.Address) {
        isValid = false;
        listErrors.push("Địa chỉ không được để trống");
    }
}

async function validateInsert(data) {
    validateData(data);
    await checkDuplicateEmail(data.Email);
    if (isDuplicate) {
        isValid = false;
        listErrors.push("Email đã tồn tại");
    }
}

module.exports = {
    getAllData,
    getByID,
    deleteRecord,
    insertRecord,
    updateRecord,
    getDataPaging
}