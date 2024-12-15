# Backend Application - Sales Analytics

## Description
Cette application backend fournit des APIs pour analyser les ventes et obtenir des informations sur les produits, les categories et les tendances des ventes.

---

## Installation et lancement

### Prérequis
- Node.js (version 16 ou supérieure)
- MongoDB installé et en cours d'exécution

### Étapes

1. **Cloner le dépôt :**
   ```bash
  
   cd backend
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement :**
   Créez un fichier `.env` à la racine et ajoutez les variables suivantes :
   ```
 1ere option : DATABASE_URL=mongodb://localhost:27017/your_database_name 
   PORT=4000
2eme option : 

Créez un compte mongodb Atlas  , 
et ensuite ajouter la connexion string . 
C'est l'option la plus recommandée car la performance est plus elevée  aux recuperations des 
données au niveau du backend . 
 
DATABASE_URL = mongodb+srv://barryasanoussa19:<db_password>@promptshareapplication.g9b2v.mongodb.net/?retryWrites=true&w=majority&appName=PromptShareApplication
  


   ```

4. **Compiler les fichiers TypeScript :**
   ```bash
   tsc --init --sourceMap --rootDir src --outDir dist 
   ```

   ```bash
      tsc --build  
  ```

5. **Démarrer l'application :**
   - En mode production :
     ```bash
     npm start
     ```
   - En mode développement (avec Nodemon) :
     ```bash
     npm run dev
     ```

6. **Tester l'API :**
   Accédez à `http://localhost:4000` avec les endpoints décrits ci-dessous.

---

## Endpoints API

### 1. **Catégorie de ventes**
- **URL :** `/category-sales`
- **Méthode :** `GET`
- **Paramètres :**
  - `startDate` (Requis) : Date de début (format : `YYYY-MM-DD`)
  - `endDate` (Requis) : Date de fin (format : `YYYY-MM-DD`)
- **Exemple de requête :**
  ```
  http://localhost:4000/category-sales?startDate=2023-12-14&endDate=2024-12-15
  ```
- **Exemple de réponse :**
  ```json
  [
    {
      "_id": "Electronics",
      "Category": "Electronics",
      "TotalSales": 14311605.24,
      "TotalQuantity": 56412,
      "Percentage": "20.38"
    }
  ]
  ```

### 2. **Produits tendance**
- **URL :** `/trending-products`
- **Méthode :** `GET`
- **Paramètres :**
  - `startDate` (Requis) : Date de début (format : `YYYY-MM-DD`)
  - `endDate` (Requis) : Date de fin (format : `YYYY-MM-DD`)
- **Exemple de requête :**
  ```
  http://localhost:4000/trending-products?startDate=2023-12-14&endDate=2024-12-15
  ```
- **Exemple de réponse :**
  ```json
  [
    {
      "_id": "96",
      "ProductName": "Water Bottle",
      "QuantitySold": 3275,
      "TotalSales": 873162.98
    }
  ]
  ```

### 3. **Produits avec ventes**
- **URL :** `/products-with-sales`
- **Méthode :** `GET`
- **Exemple de réponse :**
  ```json
  [
    {
      "_id": "675e0478e50fa397bf87f6b4",
      "ProductID": "1",
      "Price": 91.31,
      "ProductName": "Smartphone",
      "SalesCount": 796
    }
  ]
  ```

### 4. **Ventes totales**
- **URL :** `/total-sales`
- **Méthode :** `GET`
- **Paramètres :**
  - `startDate` (Requis) : Date de début (format : `YYYY-MM-DD`)
  - `endDate` (Requis) : Date de fin (format : `YYYY-MM-DD`)
- **Exemple de requête :**
  ```
  http://localhost:4000/total-sales?startDate=2023-12-14&endDate=2024-12-15
  ```
- **Exemple de réponse :**
  ```json
  {
    "totalSales": 70230449.81
  }
  ```

---

## Structure du projet

```plaintext
backend/
├── src/
│   ├── controllers/
│   │   ├── analyticsController.ts
│   ├── models/
│   │   ├── product.ts
│   │   ├── sale.ts
│   ├── services/
│   │   ├── analyticsService.ts
│   │   ├── importDataService.ts
│   ├── index.ts
├── .env
├── package.json
```

---

## Technologies utilisées
- **Node.js** : Runtime JavaScript
- **Express.js** : Framework backend
- **MongoDB** : Base de données NoSQL
- **TypeScript** : Langage avec typage statique
- **Nodemon** : Outil pour le développement backend

---

## Auteur
Nom : **Barry Sanoussa**

Email : **barrysanoussa19@gmail.com**

 
