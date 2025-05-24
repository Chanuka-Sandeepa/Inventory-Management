const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables
const cors = require('cors');
const inventoryRoutes = require('./routers/inventory');
const orderRoutes = require('./routers/order');
const supplierorderRoutes = require('./routers/supplierOrder');
const customerPurchases = require('./routers/customerPurchases');
const authRouter = require('./routers/authRoutes');


const app = express();
app.use(express.json()); // Enable JSON parsing

// Enable CORS for requests from frontend (Adjust origin if needed)
app.use(cors({ origin: 'http://localhost:3000' }));

const PORT = process.env.PORT || 3000;

console.log('MongoDB URL:', process.env.MONGODB_URL);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/supplierorder', supplierorderRoutes);
app.use('/api/customer-purchases', customerPurchases);



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
