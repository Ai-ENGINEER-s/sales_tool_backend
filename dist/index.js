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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const importDataService_1 = require("./services/importDataService"); // Importez votre fonction
const analyticsController = __importStar(require("./controllers/analyticsController"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Spécifier directement la chaîne de connexion MongoDB dans le code
const db_url = process.env.DATABASE_URL;
if (!db_url) {
    console.error('La chaîne de connexion MongoDB est manquante');
    process.exit(1); // Arrêter l'application si l'URI MongoDB est manquante
}
// Connexion à MongoDB
mongoose_1.default.connect(db_url)
    .then(() => {
    // console.log('Connexion réussie à MongoDB !');
    // Appeler directement la fonction d'importation une fois la DB connectée
    (0, importDataService_1.importData)();
})
    .catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
});
// Routes d'analyse
app.get('/total-sales', analyticsController.getTotalSales);
app.get('/trending-products', analyticsController.getTrendingProducts);
app.get('/category-sales', analyticsController.getCategorySales);
app.get('/products-with-sales', analyticsController.getProductsWithSales);
// Démarrer le serveur
const port = 4000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
//# sourceMappingURL=index.js.map