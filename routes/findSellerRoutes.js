const express = require('express');
const findSellerController = require('../controllers/findSellerController');

const router = express.Router();

router.post('/findsellers', findSellerController.findSellers);

module.exports = router;