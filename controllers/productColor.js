const productColor = require("../services/productColor.js")
const express = require('express')
const router = express.Router()

router.route('/productColors')
    .get(productColor.getAllData)
    .post(productColor.insertRecord)
    .put(productColor.updateRecord)

router.route('/productColors/:id')
    .get(productColor.getByID)
    .delete(productColor.deleteRecord)

module.exports = router