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

        const sellersMap = {};
    
        // Initialize sellers map with empty arrays
        catalogData.forEach(entry => {
          sellersMap[entry.item] = [];
        });
    
        // Populate sellers map with sellers selling each item
        catalogData.forEach(entry => {
          if (sellersMap.hasOwnProperty(entry.item)) {
            sellersMap[entry.item] = sellersMap[entry.item].concat(entry.sellers);
          }
        });
    
        // Filter out sellers who sell all the given items
        const allSellers = Object.values(sellersMap).reduce((prev, curr) => {
          return prev.filter(seller => curr.includes(seller));
        });
        

        if (allSellers.length === 0) {
          return res.status(400).json({ error: 'No seller sells all the provided items together.' });
      }

        const sellerData = await Seller.find({});
        const sellersWithDetails = allSellers.map(sellerName => {
          const seller = sellerData.find(seller => seller.name === sellerName);
          if (seller) {
              const slat = Number(seller.lat);
              const slong = Number(seller.long);
              const distance = geolib.getDistance(
                  { latitude: lat, longitude: long },
                  { latitude: slat, longitude: slong }
              );
              return {
                  ...seller,
                  distance: distance
              };
          }
          return null;
      }).filter(Boolean); // Filter out undefined values
      
      // Sort sellers by distance in ascending order
      sellersWithDetails.sort((a, b) => a.distance - b.distance);
      
      // Return names of sorted sellers
      const sortedSellers=[]
      for (let idx = 0; idx < sellersWithDetails.length; idx++) {
        sortedSellers.push([sellersWithDetails[idx]._doc.name, (String(sellersWithDetails[idx].distance)+" meters")]);     
      }
  
      res.json({ sellers: sortedSellers});
  
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}; 