# 1Fi EMI Application

A full-stack product and EMI application developed as part of the **1Fi SDE1 assignment**.

The application allows users to browse products, select product variants, view available EMI plans, select an EMI plan, and proceed with the selected plan.

Product and EMI information is stored in MongoDB and fetched dynamically through REST APIs.

---

## Live Demo

- **Frontend:** https://1-fi-assignment-red.vercel.app/
- **Backend API:** https://onefi-assignment-0hs3.onrender.com
---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js
- Mongoose
- REST API

### Database

- MongoDB
- MongoDB Atlas

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## Features

- Product listing
- Dynamic product data from MongoDB
- Dynamic product pricing
- Dynamic product images
- Multiple product variants
- Variant selection
- Variant-specific images
- Multiple EMI plans
- EMI tenure selection
- Interest rate display
- Cashback display
- EMI plan selection
- Product-specific URLs using slugs
- REST APIs
- MongoDB database
- Database seed script
- Responsive UI

---

# Project Structure

```text
1Fi-Assignment/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── EmiPlan.jsx
│   │   │   └── VariantSelector.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Products.jsx
│   │   │   └── ProductDetails.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   │
│   │   ├── models/
│   │   │   ├── Product.js
│   │   │   └── EmiPlan.js
│   │   │
│   │   ├── routes/
│   │   │   └── productRoutes.js
│   │   │
│   │   ├── seed/
│   │   │   └── seed.js
│   │   │
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# Application Architecture

```text
                    USER
                      │
                      ▼
              ┌───────────────┐
              │    Vercel     │
              │ React Frontend│
              └───────┬───────┘
                      │
                      │ REST API
                      ▼
              ┌───────────────┐
              │    Render     │
              │ Node + Express│
              └───────┬───────┘
                      │
                      │ Mongoose
                      ▼
              ┌───────────────┐
              │ MongoDB Atlas │
              │   Database    │
              └───────────────┘
```

### Data Flow

```text
React Frontend
      │
      │ GET /api/products
      │ GET /api/products/:slug
      ▼
Express Backend
      │
      ▼
Mongoose
      │
      ▼
MongoDB Atlas
      │
      ▼
Product + Variant + EMI Data
      │
      ▼
React UI
```

---

# Database Schema

The application uses **MongoDB** with two main collections:

```text
products
emiPlans
```

## Product Schema

The Product model stores product information and product variants.

```js
const variantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },

  storage: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  }
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    brand: {
      type: String,
      required: true
    },

    mrp: {
      type: Number,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    description: {
      type: String
    },

    variants: {
      type: [variantSchema],
      required: true
    }
  },
  {
    timestamps: true
  }
);
```

### Product Fields

| Field | Type | Description |
|---|---|---|
| `name` | String | Product name |
| `slug` | String | Unique product URL |
| `brand` | String | Product brand |
| `mrp` | Number | Maximum retail price |
| `price` | Number | Selling price |
| `description` | String | Product description |
| `variants` | Array | Product variants |

### Variant Fields

| Field | Type | Description |
|---|---|---|
| `color` | String | Variant color |
| `storage` | String | Storage capacity |
| `image` | String | Variant image URL |

---

# EMI Plan Schema

The EMI Plan model stores EMI information for each product.

```js
const emiPlanSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    tenure: {
      type: Number,
      required: true
    },

    monthlyAmount: {
      type: Number,
      required: true
    },

    interestRate: {
      type: Number,
      required: true
    },

    cashback: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);
```

### EMI Fields

| Field | Type | Description |
|---|---|---|
| `productId` | ObjectId | Reference to the Product |
| `tenure` | Number | EMI duration in months |
| `monthlyAmount` | Number | Monthly EMI amount |
| `interestRate` | Number | Interest rate |
| `cashback` | Number | Cashback amount |

---

# Database Relationship

Each EMI plan is associated with a product through `productId`.

```text
Product
   │
   │ _id
   ▼
EMI Plan
   │
   └── productId
```

Example:

```text
Product
_id: 12345
name: iPhone 17 Pro

        │
        ▼

EMI Plan
productId: 12345
tenure: 12
monthlyAmount: 10617
interestRate: 0
cashback: 7500
```

---

# Seed Data

The repository contains database seed data.

Seed file:

```text
backend/src/seed/seed.js
```

The seed script:

1. Connects to MongoDB
2. Removes existing products
3. Removes existing EMI plans
4. Inserts product data
5. Creates EMI plans for each product

Run the seed script:

```bash
npm run seed
```

The seed data contains products with multiple variants.

Example:

```text
iPhone 17 Pro
├── Silver · 256GB
└── Orange · 256GB

Samsung Galaxy S24 Ultra
├── Black · 256GB
└── Blue · 512GB

OnePlus 13
├── Black · 256GB
└── Blue · 512GB
```

Each product has multiple EMI plans.

### EMI Tenures

```text
3 Months
6 Months
12 Months
24 Months
36 Months
48 Months
```

---

# API Documentation

## Base URL

### Local

```text
http://localhost:5000/api
```

### Production

```text
https://onefi-assignment-0hs3.onrender.com
```

---

## GET /

Health check endpoint.

### Request

```http
GET /
```

### Example Response

```json
{
  "message": "1Fi EMI API is running"
}
```

---

## GET /api/products

Returns all products stored in MongoDB.

### Request

```http
GET /api/products
```

### Production Request

```text
https://onefi-assignment-0hs3.onrender.com/api/products
```

### Example Response

```json
{
  "success": true,
  "count": 3,
  "products": [
    {
      "_id": "PRODUCT_ID",
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "mrp": 134900,
      "price": 127400,
      "description": "The most advanced iPhone Pro experience.",
      "variants": [
        {
          "_id": "VARIANT_ID",
          "color": "Silver",
          "storage": "256GB",
          "image": "IMAGE_URL"
        },
        {
          "_id": "VARIANT_ID",
          "color": "Orange",
          "storage": "256GB",
          "image": "IMAGE_URL"
        }
      ]
    }
  ]
}
```

---

# GET /api/products/:slug

Returns a specific product and its EMI plans.

### Request

```http
GET /api/products/:slug
```

### Example

```text
https://onefi-assignment-0hs3.onrender.com/api/products/iphone-17-pro
```

### Example Response

```json
{
  "success": true,
  "product": {
    "_id": "PRODUCT_ID",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "mrp": 134900,
    "price": 127400,
    "description": "The most advanced iPhone Pro experience.",
    "variants": [
      {
        "_id": "VARIANT_ID",
        "color": "Silver",
        "storage": "256GB",
        "image": "IMAGE_URL"
      },
      {
        "_id": "VARIANT_ID",
        "color": "Orange",
        "storage": "256GB",
        "image": "IMAGE_URL"
      }
    ]
  },
  "emiPlans": [
    {
      "_id": "EMI_ID",
      "productId": "PRODUCT_ID",
      "tenure": 3,
      "monthlyAmount": 42467,
      "interestRate": 0,
      "cashback": 7500
    },
    {
      "_id": "EMI_ID",
      "productId": "PRODUCT_ID",
      "tenure": 6,
      "monthlyAmount": 21233,
      "interestRate": 0,
      "cashback": 7500
    },
    {
      "_id": "EMI_ID",
      "productId": "PRODUCT_ID",
      "tenure": 12,
      "monthlyAmount": 10617,
      "interestRate": 0,
      "cashback": 7500
    }
  ]
}
```

---

# API Error Response

If a product does not exist:

### Request

```http
GET /api/products/invalid-product
```

### Response

```json
{
  "success": false,
  "message": "Product not found"
}
```

Status:

```text
404
```

---

# Frontend Routes

## Products

```text
/
```

Displays the products fetched from the backend.

## Product Details

```text
/products/:slug
```

Examples:

```text
/products/iphone-17-pro
/products/samsung-s24-ultra
/products/oneplus-13
```

---

# Local Setup

## Prerequisites

- Node.js
- npm
- Git
- MongoDB Atlas account

---

## 1. Clone the Repository

```bash
git clone https://github.com/rajeevroy21/1Fi-Assignment.git
```

```bash
cd 1Fi-Assignment
```

---

## 2. Backend Setup

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## 3. Configure Backend Environment

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

---

## 4. Seed the Database

```bash
npm run seed
```

This populates MongoDB with the product and EMI seed data.

---

## 5. Start the Backend

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

## 6. Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

## 7. Configure Frontend Environment

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 8. Start the Frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Environment Variables

## Backend

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
```

## Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://onefi-assignment-0hs3.onrender.com/api
```

---

# Deployment

## Frontend — Vercel

Frontend deployment:

```text
https://1-fi-assignment-red.vercel.app/
```

Build command:

```bash
npm run build
```

Environment variable:

```env
VITE_API_URL=https://onefi-assignment-0hs3.onrender.com/api
```

---

## Backend — Render

Backend deployment:

```text
https://onefi-assignment-0hs3.onrender.com
```

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Required environment variable:

```env
MONGO_URI=YOUR_MONGODB_URI
```
---

# Live Application

### Frontend

https://1-fi-assignment-red.vercel.app/

### Backend

https://onefi-assignment-0hs3.onrender.com

---

# Author

**Rajeev Kumar**

Full Stack Developer