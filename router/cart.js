const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart')

router.post('/createCart', (req, res) => {
    cartController.createCart(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

router.get('/getCart', (req, res) => {
    cartController.getCart(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

router.delete('/deleteCart/:cartId', (req, res) => {
    cartController.deleteCart(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

module.exports = router