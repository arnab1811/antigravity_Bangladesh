import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock Data Generators - usually in a separate file, but here for context clarity
const MOCK_ACTORS = [
  { id: 'ACT-001', name: 'GreenValley Seeds Ltd', type: 'Producer', licenseStatus: 'Active', complianceStatus: 'Clean', country: 'Domestic' },
  { id: 'ACT-002', name: 'AgriCorp Intl', type: 'Importer', licenseStatus: 'Active', complianceStatus: 'Clean', country: 'Netherlands' },
  { id: 'ACT-003', name: 'Local Roots Co-op', type: 'Retailer', licenseStatus: 'Active', complianceStatus: 'Clean', country: 'Domestic' },
  { id: 'ACT-004', name: 'BioGenetics Inc', type: 'Breeder', licenseStatus: 'Expired', complianceStatus: 'Flagged', country: 'USA' },
  { id: 'ACT-005', name: 'FarmFresh Dealers', type: 'Distributor', licenseStatus: 'Active', complianceStatus: 'Clean', country: 'Domestic' },
];

const MOCK_VARIETIES = [
  { id: 'VAR-101', name: 'Golden Wheat V1', crop: 'Wheat', breederId: 'ACT-004', status: 'Approved' },
  { id: 'VAR-102', name: 'Super Maize 2000', crop: 'Maize', breederId: 'ACT-001', status: 'Pending DUS' },
  { id: 'VAR-103', name: 'Red Star Tomato', crop: 'Tomato', breederId: 'ACT-002', status: 'Approved' },
];

const MOCK_BATCHES = [
  { id: 'BAT-501', varietyId: 'VAR-101', actorId: 'ACT-001', quantity: '500kg', status: 'Certified' },
  { id: 'BAT-502', varietyId: 'VAR-102', actorId: 'ACT-004', quantity: '1200kg', status: 'In Testing' },
];

const BackboneContext = createContext();

export const BackboneProvider = ({ children }) => {
  // State
  const [actors, setActors] = useState(MOCK_ACTORS);
  const [varieties, setVarieties] = useState(MOCK_VARIETIES);
  const [batches, setBatches] = useState(MOCK_BATCHES);
  const [complianceEvents, setComplianceEvents] = useState([
    { id: 'EVT-900', actorId: 'ACT-004', type: 'License Expiry', date: '2023-11-01', status: 'Open' }
  ]);
  const [licenses, setLicenses] = useState([
     { id: 'LIC-701', actorId: 'ACT-001', type: 'Production', validUntil: '2025-12-31', status: 'Active' },
     { id: 'LIC-702', actorId: 'ACT-004', type: 'Breeding', validUntil: '2023-10-31', status: 'Expired' },
  ]);

  // Actions
  const triggerNonCompliance = (actorId, type = 'Manual Flag') => {
    // Add event
    const newEvent = {
       id: `EVT-${Math.floor(Math.random() * 10000)}`,
       actorId,
       type,
       date: new Date().toISOString().split('T')[0],
       status: 'Open'
    };
    setComplianceEvents(prev => [newEvent, ...prev]);

    // Update Actor Status
    setActors(prev => prev.map(actor => 
        actor.id === actorId ? { ...actor, complianceStatus: 'Flagged', licenseStatus: 'Suspended' } : actor
    ));

    // Update Licenses
    setLicenses(prev => prev.map(lic => 
        lic.actorId === actorId ? { ...lic, status: 'Suspended' } : lic
    ));
  };

  const resolveCompliance = (eventId) => {
      const event = complianceEvents.find(e => e.id === eventId);
      if(!event) return;

      // Close event
      setComplianceEvents(prev => prev.map(e => e.id === eventId ? { ...e, status: 'Resolved' } : e));

      // Check if actor has other open events. If not, clean them.
      // Basic logic: if no other open events, set actor to clean.
      const actorId = event.actorId;
      const hasOtherOpen = complianceEvents.some(e => e.actorId === actorId && e.id !== eventId && e.status === 'Open');
      
      if (!hasOtherOpen) {
          setActors(prev => prev.map(actor => 
            actor.id === actorId ? { ...actor, complianceStatus: 'Clean', licenseStatus: 'Active' } : actor
          ));
          setLicenses(prev => prev.map(lic => 
            lic.actorId === actorId ? { ...lic, status: 'Active' } : lic
          ));
      }
  };

  const registerVariety = (variety) => {
    setVarieties(prev => [...prev, { ...variety, id: `VAR-${Math.floor(Math.random()*1000)}` }]);
  };

  const runRiskAssessment = (input) => {
      // input: { actorId, origin, pestRisk }
      // Logic: If actor is flagged or pest risk high -> Block
      const actor = actors.find(a => a.id === input.actorId);
      const isFlagged = actor?.complianceStatus !== 'Clean';
      
      if (isFlagged || input.pestRisk === 'High') {
          return { result: 'High Risk', action: 'Inspection Required' };
      }
      return { result: 'Low Risk', action: 'Auto Clearance' };
  };

  return (
    <BackboneContext.Provider value={{
      actors,
      varieties,
      batches,
      complianceEvents,
      licenses,
      triggerNonCompliance,
      resolveCompliance,
      registerVariety,
      runRiskAssessment
    }}>
      {children}
    </BackboneContext.Provider>
  );
};

export const useBackbone = () => useContext(BackboneContext);
