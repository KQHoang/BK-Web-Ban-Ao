const account = require("../services/account.js")
const express = require('express')
const router = express.Router()

router.route('/accounts')
    .get(account.getAllData)
    .post(account.insertRecord)
    .put(account.updateRecord)

router.route('/accounts/:id')
    .get(account.getByID)
    .delete(account.deleteRecord)

module.exports = router