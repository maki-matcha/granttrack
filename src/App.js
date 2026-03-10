import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Import your page components
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

// Admin Imports
import AdminDashboard from './pages/admin/Dashboard';
import AdminApplication from './pages/admin/Application';
import AdminAnnouncement from './pages/admin/Announcement';
import AdminProfile from './pages/admin/Profile';

// Student Imports
import StudentDashboard from './pages/student/Dashboard';
import StudentApplication from './pages/student/Application';
import StudentAnnouncement from './pages/student/Announcement';
import StudentProfile from './pages/student/Profile';

// Organization Imports
import OrganizationDashboard from './pages/organization/Orgdb';
import OrgAnnouncement from './pages/organization/OrgAnnouncement';
import OrganizationProfile from './pages/organization/Profile';

// --- NEW: Superadmin Imports ---
import SupadminLogin from './pages/superadmin/SupadminLogin';
import Supadmin from './pages/superadmin/Supadmin';
import Supadorg from './pages/superadmin/Supadorg';
import Supadappli from './pages/superadmin/Supadappli';
import Supadannouncements from './pages/superadmin/Supadannouncements';
import Supadreportsanal from './pages/superadmin/Supadreportsanal';
import Supadsystlogs from './pages/superadmin/Supadsystlogs';
import Supaduserman from './pages/superadmin/Supaduserman';
import Supadprofile from './pages/superadmin/Supadprofile';

// --- NEW: Route Protector ---
import SuperadminProtectedRoute from './components/SuperadminProtectedRoute';

// Custom theme colors to match your design
const theme = extendTheme({
  colors: {
    brand: {
      darkBlue: '#0b253c', // Deep navy for footer/navbar
      mediumBlue: '#163a57', // Slightly lighter blue for sections
      adminBg: '#0b1d2e',   
      studentBg: '#1a4e6e', 
      sidebar: '#0d2235',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          {/* Landing Page as the default route */}
          <Route path="/" element={<LandingPage />} />

          {/* Regular Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/application" element={<AdminApplication />} />
          <Route path="/admin/announcement" element={<AdminAnnouncement />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/application" element={<StudentApplication />} />
          <Route path="/student/announcement" element={<StudentAnnouncement />} />
          <Route path="/student/profile" element={<StudentProfile />} />

          {/* Organization Routes */}
          <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
          <Route path="/organization/announcement" element={<OrgAnnouncement />} />
          <Route path="/organization/profile" element={<OrganizationProfile />} />

          {/* --- NEW: Superadmin Routes --- */}
          {/* Hidden Superadmin Login */}
          <Route path="/system-root-access" element={<SupadminLogin />} />
          
          {/* Protected Superadmin Modules */}
          <Route path="/superadmin/dashboard" element={<SuperadminProtectedRoute><Supadmin /></SuperadminProtectedRoute>} />
          <Route path="/superadmin/organizations" element={<SuperadminProtectedRoute><Supadorg /></SuperadminProtectedRoute>} />
          <Route path="/superadmin/applications" element={<SuperadminProtectedRoute><Supadappli /></SuperadminProtectedRoute>} />
          <Route path="/superadmin/announcements" element={<SuperadminProtectedRoute><Supadannouncements /></SuperadminProtectedRoute>} />
          <Route path="/superadmin/reports" element={<SuperadminProtectedRoute><Supadreportsanal /></SuperadminProtectedRoute>} />
          <Route path="/superadmin/logs" element={<SuperadminProtectedRoute><Supadsystlogs /></SuperadminProtectedRoute>} />
          <Route path="/superadmin/users" element={<SuperadminProtectedRoute><Supaduserman /></SuperadminProtectedRoute>} />
          <Route path="/superadmin/profile" element={<SuperadminProtectedRoute><Supadprofile /></SuperadminProtectedRoute>} />

        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;