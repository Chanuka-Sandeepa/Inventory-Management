import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Inventory/Header';
import Navbar from './Inventory/Navbar';
import Footer from './Inventory/Footer';
import InventoryTable from './Inventory/InventoryTable/InventoryTable';
import InventoryAdd from './Inventory/InventoryAdd/InventoryAdd';
import EditProduct from './Inventory/EditProduct/EditProduct';
import OrderPage from './Inventory/OrderPage/orderPage';
import OrderHistory from './Inventory/OrderPage/OrderHistory/orderHistory';
import TechnicianOrder from './Inventory/TechnicianOrder/TechnicianOrder';
import CustomerPurchases from './Inventory/CustomerBuy/CustomerBuy';
import Login from './Inventory/Login/Login'; // Import the new Login component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state

  // Function to set authentication to true
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Protect routes by redirecting to login if the user is not authenticated
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      {/* Keep Header and Navbar constant */}
      <Header />
      <Navbar />

      {/* Define a dashboard-like main layout */}
      <main style={{ display: 'flex', flexDirection: 'column', flex: '1', padding: '20px' }}>
        <Routes>
        
          {/* Public route */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute element={<InventoryTable />} />} />
          <Route path="/add" element={<ProtectedRoute element={<InventoryAdd />} />} />
          <Route path="/edit/:id" element={<ProtectedRoute element={<EditProduct />} />} />
          <Route path="/customerbuy" element={<ProtectedRoute element={<CustomerPurchases />} />} />
          <Route path="/order" element={<ProtectedRoute element={<OrderPage />} />} />
          <Route path="/orderhistory" element={<ProtectedRoute element={<OrderHistory />} />} />
          <Route path="/technicianOrder" element={<ProtectedRoute element={<TechnicianOrder />} />} />


        </Routes>
      </main>

      {/* Footer remains constant */}
      <Footer />
    </Router>
  );
}

export default App;
