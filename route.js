const express = require('express');
const router = express();

router.use('/user', require('./router/user'));
router.use('/product', require('./router/product'));
router.use('/cart', require('./router/cart'));
router.use('/order', require('./router/order'));

module.exports = router;