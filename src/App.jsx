import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import BackboneAdmin from './pages/BackboneAdmin';
import RegulatoryPortal from './pages/RegulatoryPortal';
import QuarantinePortal from './pages/QuarantinePortal';
import PVPPortal from './pages/PVPPortal';
import BusinessPortal from './pages/BusinessPortal';
import Governance from './pages/Governance';

import Layout from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<BackboneAdmin />} />
        <Route path="/regulatory" element={<RegulatoryPortal />} />
        <Route path="/quarantine" element={<QuarantinePortal />} />
        <Route path="/pvp" element={<PVPPortal />} />
        <Route path="/business" element={<BusinessPortal />} />
        <Route path="/governance" element={<Governance />} />
      </Routes>
    </Layout>
  );
}

export default App;
