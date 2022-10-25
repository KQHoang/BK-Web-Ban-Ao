const commnet = require("../services/comment.js")
const express = require('express')
const router = express.Router()

router.route('/comments')
    .get(commnet.getAllData)
    .post(commnet.insertRecord)
    .put(commnet.updateRecord)

router.route('/comments/:id')
    .get(commnet.getByID)
    .delete(commnet.deleteRecord)

module.exports = router