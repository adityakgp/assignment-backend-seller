const express = require('express');
const catalogController = require('../controllers/catalogController');

const router = express.Router();

router.post('/catalog', catalogController.catalog);
router.get('/catalogs', catalogController.catalogs);

module.exports = router;