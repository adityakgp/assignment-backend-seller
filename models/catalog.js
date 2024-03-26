const  mongoose = require('mongoose');

const CatalogSchema = mongoose.Schema(
    {
        item: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        sellers: {
            type: [String],
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Catalog = mongoose.model("Catalog", CatalogSchema);
module.exports = Catalog;