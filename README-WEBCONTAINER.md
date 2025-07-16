# GroGo - Grocery Delivery App (WebContainer Setup)

This is a simplified setup of the GroGo grocery delivery app for demonstration in WebContainer environment.

## 🚀 Quick Start

### 1. Setup Backend
```bash
node setup-backend.js
```

### 2. Install Dependencies & Start Gateway
```bash
cd backend_app/gateway
npm install
npm start
```

### 3. View Demo App
Open `demo-app.html` in your browser to see the web demo.

## 🏗️ What's Included

### Backend (Simplified)
- **Gateway Service**: Runs on port 8000
- **Mock Endpoints**: 
  - `/customer/login` - Authentication
  - `/product/get/categories` - Product categories
  - `/product/category/:category` - Products by category
  - Health check endpoints for each service

### Frontend (Web Demo)
- **demo-app.html**: Web version showcasing the app UI
- **Login functionality**: Demo authentication
- **Category browsing**: View product categories
- **Backend status**: Shows connection status

## 🔧 Limitations in WebContainer

This environment has some limitations compared to a full development setup:

### ❌ Not Available:
- MongoDB database (using mock data)
- RabbitMQ message broker (simplified communication)
- Stripe payments (would need API keys)
- React Native mobile app (web demo instead)
- Docker containers
- Full microservices architecture

### ✅ What Works:
- Express.js backend services
- REST API endpoints
- Basic authentication flow
- Product catalog display
- Web-based UI demonstration

## 📱 Full React Native App

The complete React Native app is in the `Frontend_app` folder with features like:
- Native mobile UI
- Redux state management
- Cart functionality
- Address management with maps
- Payment integration
- Order tracking

To run the full app, you would need:
1. React Native development environment
2. Android Studio or Xcode
3. Physical device or emulator

## 🛠️ Production Setup

For a full production deployment, you would need:

1. **Database**: MongoDB or PostgreSQL
2. **Message Broker**: RabbitMQ or Apache Kafka
3. **Payment**: Stripe integration
4. **Maps**: Mapbox API
5. **Cloud Storage**: For product images
6. **Container Orchestration**: Docker + Kubernetes
7. **CI/CD Pipeline**: For automated deployments

## 📚 Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   React Native  │    │   Web Demo      │
│   Mobile App    │    │   (HTML/JS)     │
└─────────┬───────┘    └─────────┬───────┘
          │                      │
          └──────────┬───────────┘
                     │
          ┌─────────────────┐
          │   API Gateway   │
          │   (Port 8000)   │
          └─────────┬───────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───▼───┐      ┌────▼────┐     ┌───▼────┐
│Customer│      │Products │     │Shopping│
│Service │      │Service  │     │Service │
│:8001   │      │:8002    │     │:8003   │
└────────┘      └─────────┘     └────────┘
```

## 🎯 Next Steps

1. **Start the backend**: Follow the setup instructions above
2. **Open the demo**: View demo-app.html in your browser
3. **Explore the code**: Check out the React Native app in Frontend_app/
4. **Learn more**: Read the main README.md for full setup instructions

---

**Note**: This is a demonstration version. For production use, implement proper security, error handling, and scalability measures.