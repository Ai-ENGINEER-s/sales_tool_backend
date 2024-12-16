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
exports.importProducts = importProducts;
exports.importSales = importSales;
exports.importData = importData;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const product_1 = __importDefault(require("../models/product"));
const sale_1 = __importDefault(require("../models/sale"));
// Import products from CSV
function importProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = [];
        const filePath = path_1.default.resolve(__dirname, '../../data/products.csv'); // Adjust path if needed
        return new Promise((resolve, reject) => {
            if (!fs_1.default.existsSync(filePath)) {
                return reject(new Error(`Fichier introuvable : ${filePath}`));
            }
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (row) => {
                products.push({
                    ProductID: row.ProductID,
                    ProductName: row.ProductName,
                    Category: row.Category,
                    Price: parseFloat(row.Price),
                });
            })
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    for (const product of products) {
                        yield product_1.default.updateOne({ ProductID: product.ProductID }, { $set: product }, { upsert: true } // Insert if not exists
                        );
                    }
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            }))
                .on('error', (err) => reject(err));
        });
    });
}
// Import sales from CSV
function importSales() {
    return __awaiter(this, void 0, void 0, function* () {
        const sales = [];
        const filePath = path_1.default.resolve(__dirname, '../../data/sales.csv'); // Adjust path if needed
        return new Promise((resolve, reject) => {
            if (!fs_1.default.existsSync(filePath)) {
                return reject(new Error(`Fichier introuvable : ${filePath}`));
            }
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (row) => {
                sales.push({
                    SaleID: row.SaleID,
                    ProductID: row.ProductID,
                    Quantity: parseInt(row.Quantity, 10),
                    Date: new Date(row.Date),
                    TotalAmount: parseFloat(row.TotalAmount),
                });
            })
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    for (const sale of sales) {
                        yield sale_1.default.updateOne({ SaleID: sale.SaleID }, { $set: sale }, { upsert: true } // Insert if not exists
                        );
                    }
                    // console.log('Ventes importées avec succès.');
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            }))
                .on('error', (err) => reject(err));
        });
    });
}
// Main function to import data
function importData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield importProducts();
            yield importSales();
            console.log('Données importées avec succès.');
        }
        catch (error) {
        }
    });
}
//# sourceMappingURL=importDataService.js.map