
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Mock endpoints for demo purposes
app.get('/customer/whoami', (req, res) => {
  res.json({ msg: "Customer Service - Running in WebContainer" });
});

app.get('/product/whoami', (req, res) => {
  res.json({ msg: "Products Service - Running in WebContainer" });
});

app.get('/shopping/whoami', (req, res) => {
  res.json({ msg: "Shopping Service - Running in WebContainer" });
});

// Mock product categories
app.get('/product/get/categories', (req, res) => {
  res.json([
    {
      _id: "1",
      CategoryName: "fruits & vegetables",
      CategoryImage: {
        image_url: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg"
      }
    },
    {
      _id: "2", 
      CategoryName: "dairy & breakfast",
      CategoryImage: {
        image_url: "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg"
      }
    }
  ]);
});

// Mock products by category
app.get('/product/category/:category', (req, res) => {
  const mockProducts = [
    {
      _id: "1",
      name: "Fresh Apples",
      banner: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg",
      regular_price: 150,
      weight: "1kg",
      category: req.params.category
    },
    {
      _id: "2", 
      name: "Bananas",
      banner: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg",
      regular_price: 80,
      weight: "1kg", 
      category: req.params.category
    }
  ];
  res.json(mockProducts);
});

// Mock login endpoint
app.post('/customer/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({
      id: "user123",
      token: "mock_jwt_token_for_demo",
      isAdmin: false
    });
  } else {
    res.json({ message: "Invalid credentials" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Gateway Server running on http://localhost:${PORT}`);
  console.log('📱 This is a simplified version for WebContainer demo');
  console.log('🔗 Available endpoints:');
  console.log('   GET /customer/whoami');
  console.log('   GET /product/whoami'); 
  console.log('   GET /shopping/whoami');
  console.log('   GET /product/get/categories');
  console.log('   POST /customer/login');
});
