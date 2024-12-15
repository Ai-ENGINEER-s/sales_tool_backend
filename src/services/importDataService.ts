import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import Product from '../models/product';
import Sale from '../models/sale';

// Import products from CSV
export async function importProducts(): Promise<void> {
  const products: Array<any> = [];
  const filePath = path.resolve(__dirname, '../../data/products.csv');  // Adjust path if needed

  return new Promise<void>((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`Fichier introuvable : ${filePath}`));
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        products.push({
          ProductID: row.ProductID,
          ProductName: row.ProductName,
          Category: row.Category,
          Price: parseFloat(row.Price),
        });
      })
      .on('end', async () => {
        try {
          for (const product of products) {
            await Product.updateOne(
              { ProductID: product.ProductID },
              { $set: product },
              { upsert: true } // Insert if not exists
            );
          }
    
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', (err) => reject(err));
  });
}

// Import sales from CSV
export async function importSales(): Promise<void> {
  const sales: Array<any> = [];
  const filePath = path.resolve(__dirname, '../../data/sales.csv');  // Adjust path if needed

  return new Promise<void>((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`Fichier introuvable : ${filePath}`));
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        sales.push({
          SaleID: row.SaleID,
          ProductID: row.ProductID,
          Quantity: parseInt(row.Quantity, 10),
          Date: new Date(row.Date),
          TotalAmount: parseFloat(row.TotalAmount),
        });
      })
      .on('end', async () => {
        try {
          for (const sale of sales) {
            await Sale.updateOne(
              { SaleID: sale.SaleID },
              { $set: sale },
              { upsert: true } // Insert if not exists
            );
          }
          // console.log('Ventes importées avec succès.');
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', (err) => reject(err));
  });
}

// Main function to import data
export async function importData(): Promise<void> {
  try {
    await importProducts();
    await importSales();
    console.log('Données importées avec succès.');
  } catch (error) {
   
  }
}
