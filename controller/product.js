const productModel = require('../model/product');
const stringFile = require('../constant/string_file.json');
const { ObjectId } = require('mongoose').Types;

exports.createProduct = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.body;
            await productModel.create({
                categories: data.categories,
                // images: data.images,
                text: data.text,
                mrpPrice: data.mrpPrice,
                scalePrice: data.scalePrice
            })
            resolve({
                message: stringFile.PRODUCT_ADDED_SUCCESSFULLY
            })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

exports.getProduct = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.query;

            const limit = data.limit ? parseInt(data.limit) : 10;
            const skip = data.skip ? parseInt(data.skip) : 0;

            const [products, count] = await Promise.all([
                productModel.aggregate([
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $project: {
                            _id: 1,
                            categories: 1,
                            images: 1,
                            text: 1,
                            mrpPrice: 1,
                            scalePrice: 1
                        }
                    }
                ]),
                productModel.countDocuments()
            ]);

            resolve({
                count,
                products
            });
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

exports.getSingleProduct = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.query
            const product = await productModel.aggregate([{
                $match: {
                    _id: data.productId
                }
            }, {
                $project: {
                    _id: 1,
                    categories: 1,
                    images: 1,
                    text: 1,
                    mrpPrice: 1,
                    scalePrice: 1
                }
            }])
            resolve(product)
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

exports.updateProduct = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.body;
            await productModel.updateOne({
                _id: new ObjectId(data.productId)
            }, {
                $set: {
                    ...data
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

exports.deleteProduct = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { productId } = req.params;
            await productModel.deleteOne({
                _id: new ObjectId(productId)
            });
            resolve({
                message: stringFile.DELETED_SUCCESSFULLY
            })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}
