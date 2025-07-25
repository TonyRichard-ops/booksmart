import Layout from "./Layout.jsx";

import Chat from "./Chat";

import Discover from "./Discover";

import Bookings from "./Bookings";

import Business from "./Business";

import Demo from "./Demo";

import Setup from "./Setup";

import Appointments from "./Appointments";

import Analytics from "./Analytics";

import Settings from "./Settings";

import AvailabilitySettings from "./AvailabilitySettings";

import BusinessSignup from "./BusinessSignup";

import AdminPanel from "./AdminPanel";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Chat: Chat,
    
    Discover: Discover,
    
    Bookings: Bookings,
    
    Business: Business,
    
    Demo: Demo,
    
    Setup: Setup,
    
    Appointments: Appointments,
    
    Analytics: Analytics,
    
    Settings: Settings,
    
    AvailabilitySettings: AvailabilitySettings,
    
    BusinessSignup: BusinessSignup,
    
    AdminPanel: AdminPanel,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Chat />} />
                
                
                <Route path="/Chat" element={<Chat />} />
                
                <Route path="/Discover" element={<Discover />} />
                
                <Route path="/Bookings" element={<Bookings />} />
                
                <Route path="/Business" element={<Business />} />
                
                <Route path="/Demo" element={<Demo />} />
                
                <Route path="/Setup" element={<Setup />} />
                
                <Route path="/Appointments" element={<Appointments />} />
                
                <Route path="/Analytics" element={<Analytics />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                <Route path="/AvailabilitySettings" element={<AvailabilitySettings />} />
                
                <Route path="/BusinessSignup" element={<BusinessSignup />} />
                
                <Route path="/AdminPanel" element={<AdminPanel />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}