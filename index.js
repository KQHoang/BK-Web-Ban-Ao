const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json())

var cors = require('cors')
app.use(cors()) // Use this after the variable declaration

// Khai báo kết nối
var connection = require("./connection/connect.js")
connection.connectMySql();

// khai báo router
const routerProduct = require("./controllers/product.js")
app.use(routerProduct)
const routerProductColor = require("./controllers/productColor.js")
app.use(routerProductColor)
const routerProductSize = require("./controllers/productSize.js")
app.use(routerProductSize)
const routerAccount = require("./controllers/account.js")
app.use(routerAccount)
const routerOrder = require("./controllers/order.js")
app.use(routerOrder)
const routerOrderDetail = require("./controllers/orderDetail.js")
app.use(routerOrderDetail)
const routerComment = require("./controllers/comment.js")
app.use(routerComment)
const routerCategory = require("./controllers/category.js")
app.use(routerCategory)
const routerPrice = require("./controllers/price.js")
app.use(routerPrice)
const routerPurchase = require("./controllers/purchase.js")
app.use(routerPurchase)
const routerPurchaseDetail = require("./controllers/purchaseDetail.js")
app.use(routerPurchaseDetail)
const routerSupplier = require("./controllers/supplier.js")
app.use(routerSupplier)

// error hander function
app.use((error, req, res) => {
    const err = app.get('env') === 'development' ? error : {}
    const status = error.status || 500

    return res.status(status).json({
        err: {
            message: err.message
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})