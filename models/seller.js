const  mongoose = require('mongoose');

const SellerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lat: {
            type: String,
            required: true
        },
        long: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;