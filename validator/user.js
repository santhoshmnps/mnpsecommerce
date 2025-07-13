const { check, validationResult } = require('express-validator');
const stringFile = require('../constant/string_file.json')
const userModel = require('../model/user')
const md5 = require('md5')

exports.signup = [
    check('email').not().isEmpty().withMessage(stringFile.EMAIL_NOT_EMPTY).isEmail().withMessage(stringFile.VALID_EMAIL_ID).trim(),
    check('password').not().isEmpty().withMessage(stringFile.PASSWORD_NOT_EMPTY),
    check('firstName').not().isEmpty().withMessage(stringFile.FIRSTNAME_NOT_EMPTY),
    check('lastName').not().isEmpty().withMessage(stringFile.LASTNAME_NOT_EMPTY),
    check('role').not().isEmpty().withMessage(stringFile.ROLE_NOT_EMPTY),
    check('phoneNumber').not().isEmpty().withMessage(stringFile.PHONE_NUMBER_NOT_EMPTY),
    check('email').custom(async (value) => {
      const user =  await userModel.findOne({
        email: value
      }, {
        _id: 1
      }).lean().catch(e => {
        throw Error(e.message)
      })
      if (user) throw Error(stringFile.EXISTS_EMAIL)
      else return true
    }),
    (req, res, next) => {
        const errorValidation = validationResult(req)
        if (!errorValidation.isEmpty()) {
          return res.status(stringFile.VALIDATION_ERROR_STATUS_CODE).send({
            message: errorValidation.errors.shift().msg
          })
        }
        next()
      }
]

exports.login = [
    check('email').not().isEmpty().withMessage(stringFile.EMAIL_NOT_EMPTY).isEmail().withMessage(stringFile.VALID_EMAIL_ID).trim(),
    check('password').not().isEmpty().withMessage(stringFile.PASSWORD_NOT_EMPTY),
    check('email').custom(async (value) => {
      const user = await userModel.findOne({
        email: value.toLowerCase()
      }, {
        _id: 1
      }).lean().catch(e => {
        throw Error(e.message)
      })
      if (!user) throw Error(stringFile.WRONG_EMAIL)
      else return true
    }),
    check('password').custom(async (value, {
      req
    }) => {
      const user = await userModel.findOne({
        email: req.body.email.toLowerCase(),
        password: md5(value)
      }, {
        _id: 1
      }).lean().catch(e => {
        throw Error(e.message)
      })
      if (!user) throw Error(stringFile.WRONG_PASSWORD)
      else return true
    }),
    (req, res, next) => {
      const errorValidation = validationResult(req)
      if (!errorValidation.isEmpty()) {
        return res.status(stringFile.VALIDATION_ERROR_STATUS_CODE).send({
          message: errorValidation.errors.shift().msg
        })
      }
      next()
    }
  ]