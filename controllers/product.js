const product = require("../services/product.js")
const express = require('express')
const router = express.Router()

router.route('/products')
    .get(product.getAllData)
    .post(product.insertProduct)
    .put(product.updateProduct)

router.route('/products/:id')
    .get(product.getByID)
    .delete(product.deleteProduct)

module.exports = router