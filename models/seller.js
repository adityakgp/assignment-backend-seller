const  mongoose = require('mongoose');

const SellerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;