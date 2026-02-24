import React, { useState } from 'react';
import { useBackbone } from '../context/BackboneContext';
import SimpleTable from '../components/ui/SimpleTable';
import StatusBadge from '../components/ui/StatusBadge';
import { Database, User, FileText, Box, AlertTriangle } from 'lucide-react';

const BackboneAdmin = () => {
    const { actors, varieties, batches, licenses, complianceEvents } = useBackbone();
    const [activeTab, setActiveTab] = useState('actors');

    const tabs = [
        { id: 'actors', label: 'Actor Registry', icon: User },
        { id: 'varieties', label: 'Variety Registry', icon: Database },
        { id: 'licenses', label: 'License Registry', icon: FileText },
        { id: 'batches', label: 'Batch/Lot Registry', icon: Box },
        { id: 'compliance', label: 'Compliance Registry', icon: AlertTriangle },
    ];

    /* Column Definitions */
    const actorColumns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Type', accessor: 'type' },
        { header: 'Country', accessor: 'country' },
        { header: 'License Status', accessor: 'licenseStatus', render: (row) => <StatusBadge status={row.licenseStatus} /> },
        { header: 'Compliance', accessor: 'complianceStatus', render: (row) => <StatusBadge status={row.complianceStatus} /> },
    ];

    const varietyColumns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Crop', accessor: 'crop' },
        { header: 'Breeder ID', accessor: 'breederId' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    ];

    const licenseColumns = [
        { header: 'License ID', accessor: 'id' },
        { header: 'Actor ID', accessor: 'actorId' },
        { header: 'Type', accessor: 'type' },
        { header: 'Valid Until', accessor: 'validUntil' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    ];

    const batchColumns = [
        { header: 'Batch ID', accessor: 'id' },
        { header: 'Variety ID', accessor: 'varietyId' },
        { header: 'Quantity', accessor: 'quantity' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    ];

    const complianceColumns = [
        { header: 'Event ID', accessor: 'id' },
        { header: 'Actor ID', accessor: 'actorId' },
        { header: 'Type', accessor: 'type' },
        { header: 'Date', accessor: 'date' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        { header: 'Evidence', accessor: 'evidence', render: () => <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>View PDF</a> },
    ];

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>Backbone Registry</h1>
                    <p className="text-muted">Centralized Source of Truth</p>
                </div>
                <div style={{ padding: '0.5rem 1rem', background: '#F1F5F9', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                    System Status: <span style={{ color: 'green' }}>● Online</span>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 1rem',
                            borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--text-muted)',
                            fontWeight: activeTab === tab.id ? 600 : 500,
                            transition: 'all 0.2s',
                            marginBottom: '-1px'
                        }}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                {activeTab === 'actors' && <SimpleTable columns={actorColumns} data={actors} />}
                {activeTab === 'varieties' && <SimpleTable columns={varietyColumns} data={varieties} />}
                {activeTab === 'licenses' && <SimpleTable columns={licenseColumns} data={licenses} />}
                {activeTab === 'batches' && <SimpleTable columns={batchColumns} data={batches} />}
                {activeTab === 'compliance' && <SimpleTable columns={complianceColumns} data={complianceEvents} />}
            </div>

            <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default BackboneAdmin;
