const supplier = require("../services/supplier.js")
const express = require('express')
const router = express.Router()

router.route('/suppliers')
    .get(supplier.getAllData)
    .post(supplier.insertRecord)
    .put(supplier.updateRecord)

router.route('/suppliers/:id')
    .get(supplier.getByID)
    .delete(supplier.deleteRecord)

module.exports = router