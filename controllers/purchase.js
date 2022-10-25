const purchase = require("../services/purchase.js")
const express = require('express')
const router = express.Router()

router.route('/purchases')
    .get(purchase.getAllData)
    .post(purchase.insertRecord)
    .put(purchase.updateRecord)

router.route('/purchases/:id')
    .get(purchase.getByID)
    .delete(purchase.deleteRecord)

module.exports = router