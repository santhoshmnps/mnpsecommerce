const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const md5 = require('md5')
const stringFile = require('../constant/string_file.json')
const { ObjectId } = require('mongoose').Types;

exports.signup = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const body = req.body;

            const user = await userModel.create({
                firstName: body.firstName.toLowerCase(),
                lastName: body.lastName.toLowerCase(),
                email: body.email.toLowerCase(),
                password: md5(body.password),
                role: body.role,
                phoneNumber: body.phoneNumber,
                // profile
            })

            let jwt_data = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userId: user._id
            }
            const token = jwt.sign(jwt_data, `${process.env.AUTH_KEY}`)

            resolve({
                // success: true,
                // message: "Success",
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: token
            });
        } catch (error) {
            reject({
                message: error.message,
            });
        }
    })
};

exports.login = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let body = req.body
            let user = await userModel.findOneAndUpdate({
                $or: [{
                    email: body.email.toLowerCase()
                }, {
                    email: body.email.toUpperCase()
                }],
                password: md5(body.password)
            }, {
                $set: {
                    lastLoggedIn: new Date()
                }
            }).catch(e => reject({
                message: e.message
            }))
            let jwtBody = {
                userId: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
            const token = jwt.sign(jwtBody, process.env.AUTH_KEY);
            resolve({
                userId: user._id,
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: token

            })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

exports.getUsers = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.query;

            // Check if the user is an admin
            const user = req.authBody;
            if (!user || user.role !== 'ADMIN') {
                return reject({ status: 403, message: 'Access denied. Only Admins can access.' });
            }

            const limit = data.limit ? parseInt(data.limit) : 10;
            const skip = data.skip ? parseInt(data.skip) : 0;

            const [users, count] = await Promise.all([
                userModel.aggregate([
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $project: {
                            _id: 1,
                            firstName: 1,
                            lastName: 1,
                            email: 1,
                            phoneNumber: 1
                        }
                    }
                ]),
                userModel.countDocuments()
            ]);

            resolve({
                count,
                users
            });
        } catch (error) {
            reject({
                message: error.message
            });
        }
    });
}

exports.getSingleUser = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.query;
            const user = await userModel.findOne({
                _id: new ObjectId(data.userId)
            }, {
                _id: 1,
                email: 1,
                firstName: 1,
                lastName: 1,
                phoneNumber: 1,
                role: 1,
                address: 1
            })
            resolve({
                data: user
            })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

exports.updateUser = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.body;
            await userModel.updateOne({
                _id: new ObjectId(data.userId)
            }, {
                $set: { ...data }
            });
            resolve({
                message: stringFile.UPDATED_SUCCESSFULLY
            })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

exports.addAddress = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.body;
            await userModel.updateOne({
                _id: new ObjectId(data.userId)
            }, {
                $push: {
                    address: data.address
                }
            });
            resolve({
                message: stringFile.UPDATED_SUCCESSFULLY
            })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

exports.updateAddress = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.body;
            await userModel.updateOne({
                _id: new ObjectId(data.userId),
                "address._id": new ObjectId(data.addressId)
            }, {
                $set: {
                    "address.$.doorNo": data.doorNo,
                    "address.$.building": data.building,
                    "address.$.city": data.city,
                    "address.$.state": data.state,
                    "address.$.country": data.country,
                    "address.$.pincode": data.pincode
                }
            });
            resolve({
                message: stringFile.UPDATED_SUCCESSFULLY
            })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}