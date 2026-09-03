const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("../config/db");

const Product = require("../models/Product");
const EmiPlan = require("../models/EmiPlan");

const products = [
  // ==========================================
  // 1. iPhone 17 Pro
  // ==========================================
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",
    mrp: 134900,
    price: 127400,

    description:
      "The most advanced iPhone Pro, with a titanium frame, 48MP Fusion camera system and the A19 Pro chip.",

    variants: [
      {
        color: "Silver",
        storage: "256GB",
        image:
          "https://snapmint.com/_next/image?url=https%3A%2F%2Fimages.snapmint.com%2Fproduct_assets%2Fimages%2F001%2F154%2F806%2Flarge%2Fopen-uri20251021-2855301-v0364x%3F1761017558&w=1080&q=75",
      },
      {
        color: "Orange",
        storage: "256GB",
        image:
          "https://snapmint.com/_next/image?url=https%3A%2F%2Fimages.snapmint.com%2Fproduct_assets%2Fimages%2F001%2F154%2F792%2Flarge%2Fopen-uri20251021-2855301-1lwknri%3F1761017541&w=1080&q=75",
      },
    ],
  },

  // ==========================================
  // 2. Samsung Galaxy S24 Ultra
  // ==========================================
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    brand: "Samsung",
    mrp: 129999,
    price: 119999,

    description:
      "Galaxy AI is here with a premium smartphone experience and powerful performance.",

    variants: [
      {
        color: "Black",
        storage: "256GB",
        image:
          "https://snapmint.com/_next/image?url=https%3A%2F%2Fimages.snapmint.com%2Fproduct_assets%2Fimages%2F001%2F226%2F636%2Flarge%2Fopen-uri20260409-224294-1rzvzpl%3F1775739458&w=1080&q=75",
      },
      {
        color: "Blue",
        storage: "512GB",
        image:
          "https://images.samsung.com/is/image/samsung/p6pim/in/s24-ultra/gallery/in-galaxy-s24-ultra-s928-sm-s928bztqins-thumb-539148515",
      },
    ],
  },

  // ==========================================
  // 3. OnePlus 13
  // ==========================================
  {
    name: "OnePlus 13",
    slug: "oneplus-13",
    brand: "OnePlus",
    mrp: 79999,
    price: 69999,

    description:
      "Premium smartphone experience with powerful performance and a stunning design.",

    variants: [
      {
        color: "Black",
        storage: "256GB",
        image:
          "https://image01-in.oneplus.net/media/202412/17/0c0b713df5d1f8f99b52956a17182bfc.png?x-amz-process=image/format,webp/quality,Q_80",
      },
      {
        color: "Blue",
        storage: "512GB",
        image:
          "https://image01-in.oneplus.net/media/202412/17/052a246708df8233d079b3502aeeb327.png?x-amz-process=image/format,webp/quality,Q_80",
      },
    ],
  },

  // ==========================================
  // 4. Google Pixel 9 Pro
  // ==========================================
  {
    name: "Google Pixel 9 Pro",
    slug: "google-pixel-9-pro",
    brand: "Google",
    mrp: 109999,
    price: 99999,

    description:
      "A powerful Pixel experience with advanced AI, an impressive camera and premium design.",

    variants: [
      {
        color: "Black",
        storage: "256GB",
        image:
          "https://m.media-amazon.com/images/I/51qG7EM6MZL._SX679_.jpg",
      },
      {
        color: "white",
        storage: "512GB",
        image:
          "https://www.designinfo.in/wp-content/uploads/2025/01/Google-Pixel-9-Pro-128GB-Unlocked-Porcelain-3-485x485.webp",
      },
    ],
  },

  // ==========================================
  // 5. Xiaomi 15
  // ==========================================
  {
    name: "Xiaomi 15",
    slug: "xiaomi-15",
    brand: "Xiaomi",
    mrp: 74999,
    price: 64999,

    description:
      "Flagship performance with a powerful processor, Leica camera system and premium display.",

    variants: [
      {
        color: "Black",
        storage: "256GB",
        image:
          "https://rukminim1.flixcart.com/image/1536/1536/xif0q/mobile/t/j/l/xiaomi15-24129pn74i-xiaomi-original-imahgb7uxs8sthm4.jpeg?q=90",
      },
      {
        color: "Green",
        storage: "512GB",
        image:
          "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-15/pc/031d30f2cfab177f07a181e0cd03fcf4.png?f=webp",
      },
    ],
  },

  // ==========================================
  // 6. Nothing Phone (3)
  // ==========================================
  {
    name: "Nothing Phone (3)",
    slug: "nothing-phone-3",
    brand: "Nothing",
    mrp: 59999,
    price: 54999,

    description:
      "A unique smartphone with a clean design, powerful performance and the iconic Nothing interface.",

    variants: [
      {
        color: "Black",
        storage: "256GB",
        image:
          "https://m.media-amazon.com/images/I/717z2bNF6DL._SL1500_.jpg",
      },
      {
        color: "White",
        storage: "512GB",
        image:
          "https://cdn.shopify.com/s/files/1/0586/3270/0077/files/0000s_0011_Phone-3-white.png?v=1753757325",
      },
    ],
  },
];

// ==========================================
// Seed Database
// ==========================================

const seedDatabase = async () => {
  try {
    console.log("Connecting to database...");

    await connectDB();

    console.log("Connected to database");

    // ------------------------------------------
    // Remove old data
    // ------------------------------------------

    await Product.deleteMany({});
    await EmiPlan.deleteMany({});

    console.log("Old products and EMI plans removed");

    // ------------------------------------------
    // Insert products
    // ------------------------------------------

    const createdProducts = await Product.insertMany(products);

    console.log(
      `${createdProducts.length} products inserted`
    );

    // ------------------------------------------
    // Create EMI plans
    // ------------------------------------------

    const emiPlans = [];

    createdProducts.forEach((product) => {
      // 3 Months
      emiPlans.push({
        productId: product._id,
        tenure: 3,
        monthlyAmount: Math.round(product.price / 3),
        interestRate: 0,
        cashback: 7500,
      });

      // 6 Months
      emiPlans.push({
        productId: product._id,
        tenure: 6,
        monthlyAmount: Math.round(product.price / 6),
        interestRate: 0,
        cashback: 7500,
      });

      // 12 Months
      emiPlans.push({
        productId: product._id,
        tenure: 12,
        monthlyAmount: Math.round(product.price / 12),
        interestRate: 0,
        cashback: 7500,
      });

      // 24 Months
      emiPlans.push({
        productId: product._id,
        tenure: 24,
        monthlyAmount: Math.round(product.price / 24),
        interestRate: 0,
        cashback: 7500,
      });

      // 36 Months
      emiPlans.push({
        productId: product._id,
        tenure: 36,
        monthlyAmount: Math.round(product.price / 36),
        interestRate: 10.5,
        cashback: 7500,
      });

      // 48 Months
      emiPlans.push({
        productId: product._id,
        tenure: 48,
        monthlyAmount: Math.round(product.price / 48),
        interestRate: 10.5,
        cashback: 7500,
      });
    });

    // ------------------------------------------
    // Insert EMI plans
    // ------------------------------------------

    await EmiPlan.insertMany(emiPlans);

    console.log(
      `${emiPlans.length} EMI plans inserted`
    );

    // ------------------------------------------
    // Final result
    // ------------------------------------------

    console.log("--------------------------------");
    console.log("Database seeded successfully!");
    console.log("--------------------------------");

    console.log(
      `Products: ${createdProducts.length}`
    );

    console.log(
      `EMI Plans: ${emiPlans.length}`
    );

    console.log("--------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);

    process.exit(1);
  }
};

seedDatabase();