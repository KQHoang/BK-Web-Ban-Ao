const category = require("../services/category.js")
const express = require('express')
const router = express.Router()

router.route('/categorys')
    .get(category.getAllData)
    .post(category.insertRecord)
    .put(category.updateRecord)

router.route('/categorys/:id')
    .get(category.getByID)
    .delete(category.deleteRecord)

module.exports = router