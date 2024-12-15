import mongoose, { Schema, Document } from 'mongoose';

// Définition de l'interface pour Product
export interface Product extends Document {
  ProductID: string; // ID du produit
  ProductName: string; // Nom du produit
  Category: string; // Catégorie du produit
  Price: number; // Prix du produit
}

// Définition du schéma pour Product
const productSchema: Schema = new Schema({
  ProductID: { type: String, required: true },
  ProductName: { type: String, required: true },
  Category: { type: String, required: true },
  Price: { type: Number, required: true },
});

const Product = mongoose.model<Product>('Product', productSchema);

export default Product;
