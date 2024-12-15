
import { Request, Response } from 'express';
import * as analyticsService from '../services/analyticsService';

export const getTotalSales = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Les dates de début et de fin sont requises.' });
    }
    const totalSales = await analyticsService.getTotalSales(startDate as string, endDate as string);
    res.json({ totalSales });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

export const getTrendingProducts = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Les dates de début et de fin sont requises.' });
    }
    const trendingProducts = await analyticsService.getTrendingProducts(startDate as string, endDate as string);
    res.json(trendingProducts);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

export const getCategorySales = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Les dates de début et de fin sont requises.' });
    }
    const categorySales = await analyticsService.getCategorySales(startDate as string, endDate as string);
    res.json(categorySales);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

export const getProductsWithSales = async (req: Request, res: Response) => {
  try {
    const productsWithSales = await analyticsService.getProductsWithSales();
    res.json(productsWithSales);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

