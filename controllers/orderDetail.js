const orderDetail = require("../services/orderDetail.js")
const express = require('express')
const router = express.Router()

router.route('/orderDetails')
    .get(orderDetail.getAllData)
    .post(orderDetail.insertRecord)
    .put(orderDetail.updateRecord)

router.route('/orderDetails/:id')
    .get(orderDetail.getByID)
    .delete(orderDetail.deleteRecord)

module.exports = router