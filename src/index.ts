import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { importData } from './services/importDataService';  // Importez votre fonction
import * as analyticsController from './controllers/analyticsController';
import dotenv from 'dotenv' ; 


dotenv.config() ; 

const app = express();
app.use(express.json());
app.use(cors());

// Spécifier directement la chaîne de connexion MongoDB dans le code
const db_url = process.env.DATABASE_URL; 

if (!db_url) {
  console.error('La chaîne de connexion MongoDB est manquante');
  process.exit(1); // Arrêter l'application si l'URI MongoDB est manquante
}

// Connexion à MongoDB
mongoose.connect(db_url)
  .then(() => {
    // console.log('Connexion réussie à MongoDB !');
    // Appeler directement la fonction d'importation une fois la DB connectée
    importData();
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
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
