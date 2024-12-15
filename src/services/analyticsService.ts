
import Product from "../models/product";
import Sale from "../models/sale";

// Fonction pour obtenir le total des ventes entre deux dates
export const getTotalSales = async (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Convertir les dates en UTC
  start.setUTCHours(0, 0, 0, 0); // Début de la journée UTC
  end.setUTCHours(23, 59, 59, 999); // Fin de la journée UTC

  const sales = await Sale.aggregate([
    { 
      $match: { 
        Date: { 
          $gte: start, 
          $lte: end 
        } 
      }
    },
    { 
      $group: { 
        _id: null, 
        totalSales: { $sum: '$TotalAmount' } 
      } 
    }
  ]);

  return sales.length > 0 ? sales[0].totalSales : 0;
};

// Fonction pour obtenir les produits tendance entre deux dates
export const getTrendingProducts = async (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Convertir les dates en UTC
  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(23, 59, 59, 999);

  const products = await Sale.aggregate([
    { 
      $match: { 
        Date: { 
          $gte: start, 
          $lte: end 
        } 
      }
    },
    { 
      $group: { 
        _id: '$ProductID', 
        totalQuantity: { $sum: '$Quantity' }, 
        totalSales: { $sum: '$TotalAmount' } 
      } 
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 5 },  // Limiter aux 5 premiers produits
    { 
      $lookup: { 
        from: 'products', 
        localField: '_id', 
        foreignField: 'ProductID', 
        as: 'productDetails' 
      } 
    },
    { $unwind: '$productDetails' },
    { 
      $project: { 
        ProductName: '$productDetails.ProductName', 
        QuantitySold: '$totalQuantity', 
        TotalSales: '$totalSales' 
      } 
    }
  ]);

  return products;
};

// Fonction pour obtenir les ventes par catégorie entre deux dates
export const getCategorySales = async (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Convertir les dates en UTC
  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(23, 59, 59, 999);

  const categorySales = await Sale.aggregate([
    { 
      $match: { 
        Date: { 
          $gte: start, 
          $lte: end 
        } 
      }
    },
    { 
      $lookup: { 
        from: 'products', 
        localField: 'ProductID', 
        foreignField: 'ProductID', 
        as: 'productDetails' 
      } 
    },
    { $unwind: '$productDetails' },
    { 
      $group: { 
        _id: '$productDetails.Category', 
        totalSales: { $sum: '$TotalAmount' }, 
        totalQuantity: { $sum: '$Quantity' } 
      } 
    },
    { 
      $project: { 
        Category: '$_id', 
        TotalSales: '$totalSales', 
        TotalQuantity: '$totalQuantity' 
      } 
    }
  ]);

  // Calculer le total des ventes et le pourcentage des ventes par catégorie
  const totalSales = categorySales.reduce((sum, category) => sum + category.TotalSales, 0);
  categorySales.forEach(category => {
    category.Percentage = ((category.TotalSales / totalSales) * 100).toFixed(2);
  });

  return categorySales;
};

// Fonction pour obtenir les produits avec leurs ventes
export const getProductsWithSales = async () => {
  const productsWithSales = await Product.aggregate([
    {
      $lookup: {
        from: 'sales', 
        localField: 'ProductID',
        foreignField: 'ProductID', 
        as: 'salesDetails'
      }
    },
    {
      $project: {
        ProductID: 1,
        ProductName: 1,
        Price: 1,
        SalesCount: { $size: '$salesDetails' }
      }
    }
  ]);

  return productsWithSales;
};
