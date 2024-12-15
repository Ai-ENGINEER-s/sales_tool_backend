import mongoose, { Schema, Document } from 'mongoose';

// Définition de l'interface pour Sale
export interface Sale extends Document {
  SaleID: string; // ID de la vente
  ProductID: string; // ID du produit
  Quantity: number; // Quantité vendue
  Date: Date; // Date de la vente
  TotalAmount: number; // Montant total de la vente
}

// Définition du schéma pour Sale
const saleSchema: Schema = new Schema({
  SaleID: { type: String, required: true },
  ProductID: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Date: { type: Date, required: true },
  TotalAmount: { type: Number, required: true },
});

const Sale = mongoose.model<Sale>('Sale', saleSchema);

export default Sale;
