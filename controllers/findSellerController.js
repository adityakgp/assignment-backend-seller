const Seller = require('../models/seller');
const Catalog = require('../models/catalog');
const geolib = require('geolib');

exports.findSellers = async (req, res) => {
    try {
        const { items, lat, long } = req.body;
    
        if (!items || !Array.isArray(items) || items.length === 0) {
          return res.status(400).json({ error: 'Invalid request. Please provide an array of items.' });
        }


        const catalogData = await Catalog.find({item: { $in: items }});
        if (catalogData.length != items.length) {
          return res.status(400).json({ error: 'No seller sells the provided item(s).' });
        }


        const commonSellersSet = catalogData.map(item => new Set(item.sellers)).reduce((acc, currentSet) => {
          return new Set([...acc].filter(seller => currentSet.has(seller)));
        });
        if (commonSellersSet.size === 0) {
          return res.status(400).json({ error: 'No seller sells all the provided items together.' });
        }
        
        
        const commonSellers = Array.from(commonSellersSet);
        const sellerData = await Seller.find({});
        const sellersWithDetails = commonSellers.map(sellerName => {
          const seller = sellerData.find(seller => seller.name === sellerName);
          if (seller) {
            const distance = geolib.getDistance(
                  { latitude: lat, longitude: long },
                  { latitude: seller.lat, longitude: seller.long }
              );
              return {
                  ...seller,
                  distance: distance
              };
          }
          return null;
      }).filter(Boolean); 
      
      
      sellersWithDetails.sort((a, b) => a.distance - b.distance);
      const sortedSellers = sellersWithDetails.map(seller => [seller._doc.name, `${seller.distance} meters`]);
      res.json({ sellers: sortedSellers});
  

      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}; 