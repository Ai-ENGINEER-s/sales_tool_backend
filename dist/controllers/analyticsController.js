"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsWithSales = exports.getCategorySales = exports.getTrendingProducts = exports.getTotalSales = void 0;
const analyticsService = __importStar(require("../services/analyticsService"));
const getTotalSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Les dates de début et de fin sont requises.' });
        }
        const totalSales = yield analyticsService.getTotalSales(startDate, endDate);
        res.json({ totalSales });
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
});
exports.getTotalSales = getTotalSales;
const getTrendingProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Les dates de début et de fin sont requises.' });
        }
        const trendingProducts = yield analyticsService.getTrendingProducts(startDate, endDate);
        res.json(trendingProducts);
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
});
exports.getTrendingProducts = getTrendingProducts;
const getCategorySales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Les dates de début et de fin sont requises.' });
        }
        const categorySales = yield analyticsService.getCategorySales(startDate, endDate);
        res.json(categorySales);
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
});
exports.getCategorySales = getCategorySales;
const getProductsWithSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsWithSales = yield analyticsService.getProductsWithSales();
        res.json(productsWithSales);
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
});
exports.getProductsWithSales = getProductsWithSales;
//# sourceMappingURL=analyticsController.js.map