const jwt = require('jsonwebtoken');
const stringFile = require('../constant/string_file.json')

exports.JwtVerification = function (req, res, next) {
    if (process.env.JWT_EXCEPTIONAL_URL.includes(req.path)) {
        next()
    } else {
        req.headers.authorization = req.headers.authorization.includes("Bearer") ? req.headers.authorization.replace('Bearer', '').trim() : req.headers.authorization
        jwt.verify(req.headers.authorization, process.env.AUTH_KEY, (err, result) => {
            if (err) {
                return res.status(stringFile.AUTHORIZATION_ERROR_CODE).send({
                    message: stringFile.UNAUTHORISED_ACCESS_MESSAGE
                })
            } else {
                req.authBody = result
                next()
            }
        })
    }
}