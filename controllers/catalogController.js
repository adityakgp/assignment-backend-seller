const Catalog = require('../models/catalog');

exports.catalog = async (req, res) => {
    try {
        const catalog = await Catalog.create(req.body);
        res.status(200).json(catalog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.catalogs = async (req, res) => {
    try {
        const catalog = await Catalog.find({});
        res.status(200).json(catalog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};