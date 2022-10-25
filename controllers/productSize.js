const productSize = require("../services/productSize.js")
const express = require('express')
const router = express.Router()

router.route('/productSizes')
    .get(productSize.getAllData)
    .post(productSize.insertRecord)
    .put(productSize.updateRecord)

router.route('/productSizes/:id')
    .get(productSize.getByID)
    .delete(productSize.deleteRecord)

module.exports = router