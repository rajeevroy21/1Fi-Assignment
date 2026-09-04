# 1Fi EMI Application

A full-stack product and EMI application developed as part of the 1Fi SDE1 assignment.

The application allows users to browse products, select product variants, view available EMI plans, select an EMI plan, and proceed with the selected plan.

Product and EMI information is stored in MongoDB and fetched dynamically through REST APIs.

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

- Vercel - Frontend
- Render - Backend
- MongoDB Atlas - Database

---

# Project Structure

```text
1fi-emi-app/
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

# Features

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
- Selected EMI plan
- Product-specific URLs using slugs
- REST APIs
- MongoDB database
- Database seed script
- Responsive UI
- Frontend and backend deployment

---

# Application Flow

```text
User
 │
 ▼
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

# Database

MongoDB is used as the database.

The application uses two main collections:

```text
products
emiPlans
```

---

# Product Schema

The Product model stores product information and its variants.

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
| `slug` | String | Unique product URL slug |
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
| `productId` | ObjectId | Reference to Product |
| `tenure` | Number | EMI duration in months |
| `monthlyAmount` | Number | Monthly EMI amount |
| `interestRate` | Number | Interest rate |
| `cashback` | Number | Cashback amount |

---

# Database Relationship

Each EMI plan belongs to a particular product.

```text
Product
   │
   │ _id
   ▼
EMI Plan
   │
   └── productId
```

For example:

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

Run the seed command:

```bash
npm run seed
```

---

# Product Seed Data

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

Each product has its own unique slug.

Example:

```text
iphone-17-pro
samsung-s24-ultra
oneplus-13
```

---

# EMI Seed Data

The seed script creates multiple EMI plans for every product.

Available tenures:

```text
3 Months
6 Months
12 Months
24 Months
36 Months
48 Months
```

Each EMI plan contains:

```text
Monthly Amount
Tenure
Interest Rate
Cashback
```

Example:

```js
{
  productId: product._id,
  tenure: 12,
  monthlyAmount: Math.round(product.price / 12),
  interestRate: 0,
  cashback: 7500
}
```

---

# API Documentation

Base API URL:

```text
http://localhost:5000/api
```

Production API:

```text
https://YOUR-RENDER-URL.onrender.com/api
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

# GET /api/products

Returns all products from MongoDB.

### Request

```http
GET /api/products
```

### Example

```text
http://localhost:5000/api/products
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
http://localhost:5000/api/products/iphone-17-pro
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

If a requested product does not exist:

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

HTTP status:

```text
404
```

---

# Frontend Routes

## Products Page

```text
/
```

Displays all products fetched from the backend.

---

## Product Details Page

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

Install the following:

- Node.js
- npm
- Git
- MongoDB Atlas account

---

# Step 1: Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Go to the project:

```bash
cd 1fi-emi-app
```

---

# Step 2: Backend Setup

Go to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Step 3: Configure Backend Environment

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/1fi
```

Do not commit `.env` to GitHub.

---

# Step 4: Seed Database

Run:

```bash
npm run seed
```

This will populate MongoDB with the sample products, variants, and EMI plans.

---

# Step 5: Start Backend

Run:

```bash
npm run dev
```

Backend will run at:

```text
http://localhost:5000
```

Test the backend:

```text
http://localhost:5000/
```

Test the products API:

```text
http://localhost:5000/api/products
```

---

# Step 6: Frontend Setup

Open another terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# Step 7: Configure Frontend Environment

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Step 8: Start Frontend

Run:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

Open the URL in your browser.

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
VITE_API_URL=https://YOUR-RENDER-URL.onrender.com/api
```

---

# Security

Environment files containing secrets should not be committed.

Add the following to `.gitignore`:

```text
.env
node_modules/
```

Use `.env.example` files to document required environment variables.

Example:

### backend/.env.example

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
```

### frontend/.env.example

```env
VITE_API_URL=http://localhost:5000/api
```
---

# Deployment

## Frontend - Vercel

The React frontend can be deployed using Vercel.

### Root Directory

```text
frontend
```

### Build Command

```bash
npm run build
```

### Environment Variable

```text
VITE_API_URL=https://YOUR-RENDER-URL.onrender.com/api
```

---

# Backend - Render

The Express backend can be deployed using Render.

### Root Directory

```text
backend
```

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

### Environment Variable

```text
MONGO_URI=YOUR_MONGODB_URI
```

---

# MongoDB Atlas

MongoDB Atlas is used for the production database.

The backend connects to MongoDB using:

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Make sure the MongoDB Atlas network access settings allow the deployed backend to connect.

---

# Production Architecture

```text
                   USER
                     │
                     ▼
              ┌─────────────┐
              │   Vercel    │
              │    React    │
              │  Frontend   │
              └──────┬──────┘
                     │
                     │ HTTPS REST API
                     ▼
              ┌─────────────┐
              │   Render    │
              │ Node +      │
              │ Express     │
              └──────┬──────┘
                     │
                     │ Mongoose
                     ▼
              ┌─────────────┐
              │  MongoDB    │
              │    Atlas    │
              └─────────────┘
```

---

# GitHub Repository Deliverables

The GitHub repository contains all required assignment deliverables.

## a. Database Schema and Seed Data

The repository contains:

- Product database schema
- Product variant schema
- EMI plan schema
- Product seed data
- EMI seed data
- Product-to-EMI relationship

### Database Models

```text
backend/src/models/Product.js
backend/src/models/EmiPlan.js
```

### Seed Data

```text
backend/src/seed/seed.js
```

The seed script can be executed using:

```bash
npm run seed
```

---

# b. README.md

This README contains all required documentation.

## i. Setup and Run Instructions

This document explains:

- Prerequisites
- Repository cloning
- Backend setup
- Frontend setup
- MongoDB configuration
- Environment variables
- Database seeding
- Running the backend
- Running the frontend

---

## ii. API Endpoints and Example Responses

The following APIs are documented:

```text
GET /
GET /api/products
GET /api/products/:slug
```

Each API includes:

- HTTP method
- Endpoint
- Description
- Example request
- Example JSON response
- Error response where applicable

---

## iii. Tech Stack Used

### Frontend

```text
React
Vite
React Router
Tailwind CSS
JavaScript
```

### Backend

```text
Node.js
Express.js
Mongoose
REST API
```

### Database

```text
MongoDB
MongoDB Atlas
```

### Deployment

```text
Vercel
Render
MongoDB Atlas
```

---

## iv. Schema Used

The repository and README document the following schemas:

```text
Product Schema
Variant Schema
EMI Plan Schema
Product-EMI Relationship
```

---

# Live Links

## Frontend

```text
YOUR_VERCEL_URL
```

## Backend

```text
YOUR_RENDER_URL
```

## GitHub Repository

```text
YOUR_GITHUB_REPOSITORY_URL
```

---

# Author

**Rajeev Kumar**

Full Stack Developer

---

# License

This project was developed as part of the **1Fi SDE1 Assignment**.