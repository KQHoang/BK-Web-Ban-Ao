const order = require("../services/order.js")
const express = require('express')
const router = express.Router()

router.route('/orders')
    .get(order.getAllData)
    .post(order.insertRecord)
    .put(order.updateRecord)

router.route('/orders/:id')
    .get(order.getByID)
    .delete(order.deleteRecord)

module.exports = router