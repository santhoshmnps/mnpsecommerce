const cartModel = require('../model/cart');
const stringFile = require('../constant/string_file.json')

exports.createCart = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.body;
            await cartModel.create({
                userId: data.userId,
                productId: data.productId
            })
            resolve({
                message: stringFile.CART_ADDED_SUCCESSFULLY
            })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

exports.getCart = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.query;
            const limit = data.limit ? parseInt(data.limit) : 10;
            const skip = data.skip ? parseInt(data.skip) : 0;

            const [carts, count] = await Promise.all([
                cartModel.aggregate([
                    { $skip: skip },
                    { $limit: limit },
                    // {
                    //     $project: {
                    //         _id: 1,
                    //         firstName: 1,
                    //         lastName: 1,
                    //         email: 1,
                    //         phoneNumber: 1
                    //     }
                    // }
                ]),
                cartModel.countDocuments()
            ]);

            resolve({
                count,
                carts
            });
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

exports.deleteCart = (req) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const {cartId} = req.params
            await cartModel.deleteOne({
                _id: ObjectId(cartId)
            })
            resolve({
                message: stringFile.DELETED_SUCCESSFULLY
            })
        } catch(error){
            reject({
                message: error.message
            })
        }
    })
}