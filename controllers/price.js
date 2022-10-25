const price = require("../services/price.js")
const express = require('express')
const router = express.Router()

router.route('/prices')
    .get(price.getAllData)
    .post(price.insertRecord)
    .put(price.updateRecord)

router.route('/prices/:id')
    .get(price.getByID)
    .delete(price.deleteRecord)

module.exports = router