const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const stringFile = require('../constant/string_file.json')
const userValidator = require('../validator/user')

router.post('/signup', userValidator.signup, (req, res) => {
    userController.signup(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

router.post('/login', userValidator.login, (req, res) => {
    userController.login(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

router.get('/getUsers', (req, res) => {
    userController.getUsers(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

router.get('/getSingleUser', (req, res) => {
    userController.getSingleUser(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

router.put('/updateUser', (req, res) => {
    userController.updateUser(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

router.put('/addAddress', (req, res) => {
    userController.addAddress(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})
router.put('/updateAddress', (req, res) => {
    userController.updateAddress(req).then((data) => {
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
        message: err.message
    }))
})

// forget password
// router.put('/forgetPassword', (req, res) => {
//     userController.forgetPassword(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
//         message: err.message
//     }))
// })

// reset password
// router.put('/resetPassword', (req, res) => {
//     userController.resetPassword(req).then((data) => {
//         res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
//     }).catch((err) => res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send({
//         message: err.message
//     }))
// })

module.exports = router;
