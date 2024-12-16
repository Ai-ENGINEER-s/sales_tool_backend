"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsWithSales = exports.getCategorySales = exports.getTrendingProducts = exports.getTotalSales = void 0;
const product_1 = __importDefault(require("../models/product"));
const sale_1 = __importDefault(require("../models/sale"));
// Fonction pour obtenir le total des ventes entre deux dates
const getTotalSales = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Convertir les dates en UTC
    start.setUTCHours(0, 0, 0, 0); // Début de la journée UTC
    end.setUTCHours(23, 59, 59, 999); // Fin de la journée UTC
    const sales = yield sale_1.default.aggregate([
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
});
exports.getTotalSales = getTotalSales;
// Fonction pour obtenir les produits tendance entre deux dates
const getTrendingProducts = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Convertir les dates en UTC
    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(23, 59, 59, 999);
    const products = yield sale_1.default.aggregate([
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
        { $limit: 5 }, // Limiter aux 5 premiers produits
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
});
exports.getTrendingProducts = getTrendingProducts;
// Fonction pour obtenir les ventes par catégorie entre deux dates
const getCategorySales = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Convertir les dates en UTC
    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(23, 59, 59, 999);
    const categorySales = yield sale_1.default.aggregate([
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
});
exports.getCategorySales = getCategorySales;
// Fonction pour obtenir les produits avec leurs ventes
const getProductsWithSales = () => __awaiter(void 0, void 0, void 0, function* () {
    const productsWithSales = yield product_1.default.aggregate([
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
});
exports.getProductsWithSales = getProductsWithSales;
//# sourceMappingURL=analyticsService.js.map