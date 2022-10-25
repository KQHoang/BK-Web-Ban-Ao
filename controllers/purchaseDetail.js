const purchaseDetail = require("../services/purchaseDetail.js")
const express = require('express')
const router = express.Router()

router.route('/purchasedetails')
    .get(purchaseDetail.getAllData)
    .post(purchaseDetail.insertRecord)
    .put(purchaseDetail.updateRecord)

router.route('/purchasedetails/:id')
    .get(purchaseDetail.getByID)
    .delete(purchaseDetail.deleteRecord)

module.exports = router