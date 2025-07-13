const express = require("express");
const router = express();
const orderController = require('../controller/order');
const stringFile = require("../constant/string_file.json")

router.post('/createOrder', (req, res) => {
    orderController.createOrder(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

// router.get('/getOrder', (req, res) => {
//     orderController.getOrder(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
//         message: err.message
//     }))
// })

// router.get('/getSingleOrder', (req, res) => {
//     orderController.getSingleOrder(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
//         message: err.message
//     }))
// })

// router.put('/updateOrder', (req, res) => {
//     orderController.updateOrder(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
//         message: err.message
//     }))
// })

// router.delete('/deleteOrder', (req, res) => {
//     orderController.deleteOrder(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch(err => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
//         message: err.message
//     }))
// })


module.exports = router;