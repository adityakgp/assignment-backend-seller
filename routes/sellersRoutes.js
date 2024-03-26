const express = require('express');
const sellersController = require('../controllers/sellersController');

const router = express.Router();

router.post('/seller', sellersController.seller);
router.get('/sellers', sellersController.sellers);

module.exports = router;