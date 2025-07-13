const express =  require('express');
const router = express.Router();
const productController = require('../controller/product')
const stringFile = require('../constant/string_file.json')
const userValidator = require('../validator/user')

router.post('/createProduct', (req, res) => {
    productController.createProduct(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

router.get('/getProduct', (req, res) => {
    productController.getProduct(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

router.get('/getSingleProduct',  (req, res) => {
    productController.getSingleProduct(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

router.put('/updateProduct', (req, res) => {
    productController.updateProduct(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

router.delete('/deleteProduct/:productId', (req, res) => {
    productController.deleteProduct(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

module.exports = router;
