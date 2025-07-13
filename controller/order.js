const orderModel = require("../model/order");
const stringFile = require('../constant/string_file.json')

exports.createOrder = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.body;
            await orderModel.create({
                productId: data.productId,
                userId: data.userId,
                placedDate: data.placedDate,
                deliveredDate: data.deliveredDate,
                address: data.address
            })
            resolve({
                message: stringFile.ORDER_CREATED_SUCCESSFULLY
            })
        } catch (error) {
            reject({
                message: error.message
            })
        }
    })
}

// exports.getOrder = (req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const data = req.body;
            
//             resolve({
//                 message: stringFile.ORDER_CREATED_SUCCESSFULLY
//             })
//         } catch (error) {
//             reject({
//                 message: error.message
//             })
//         }
//     })
// }

// exports.getSingleOrder = (req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const data = req.body;
            
//             resolve({
//                 message: stringFile.ORDER_CREATED_SUCCESSFULLY
//             })
//         } catch (error) {
//             reject({
//                 message: error.message
//             })
//         }
//     })
// }

// exports.updateOrder = (req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const data = req.body;
            
//             resolve({
//                 message: stringFile.ORDER_CREATED_SUCCESSFULLY
//             })
//         } catch (error) {
//             reject({
//                 message: error.message
//             })
//         }
//     })
// }

// exports.deleteOrder = (req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const data = req.body;
            
//             resolve({
//                 message: stringFile.ORDER_CREATED_SUCCESSFULLY
//             })
//         } catch (error) {
//             reject({
//                 message: error.message
//             })
//         }
//     })
// }