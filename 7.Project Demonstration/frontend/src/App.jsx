import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllBookings from "./pages/AllBookings";

import Login from './pages/Login';
import Register from './pages/Register';

import RenterDashboard from './pages/RenterDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AddProperty from './pages/AddProperty';
import MyBookings from "./pages/MyBookings";
import OwnerBookings from "./pages/OwnerBookings";

/*
⚠️ IMPORTANT:
We are NOT using OwnerBookings anywhere
until the file actually exists.
This prevents blank screen crashes.
*/

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route path="/renter" element={<RenterDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />

        {/* Owner Actions */}
        <Route path="/add-property" element={<AddProperty />} />

        <Route path="/owner-bookings" element={<AllBookings />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner/bookings" element={<OwnerBookings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;