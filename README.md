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