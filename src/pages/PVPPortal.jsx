import React, { useState } from 'react';
import { useBackbone } from '../context/BackboneContext';
import Card from '../components/ui/Card';
import SimpleTable from '../components/ui/SimpleTable';
import StatusBadge from '../components/ui/StatusBadge';
import { Scale, FileText, Lock, Globe } from 'lucide-react';

const PVPPortal = () => {
    const { varieties, triggerNonCompliance } = useBackbone();
    const [activeTab, setActiveTab] = useState('dus');

    const handleInfringement = (varietyId) => {
        // Logic: Log infringement
        triggerNonCompliance('ACT-004', 'PVP Infringement: Unauthorized Propagation'); // Mocking actor 4
        alert("Infringement Case Logged to Backbone. Compliance Alert Sent.");
    };

    const dusColumns = [
        { header: 'Variety ID', accessor: 'id' },
        { header: 'Proposed Name', accessor: 'name' },
        { header: 'Crop', accessor: 'crop' },
        { header: 'DUS Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        { header: 'Actions', accessor: 'actions', render: (row) => <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>View DUS Report</button> }
    ];

    return (
        <div className="container" style={{ borderTop: '4px solid var(--portal-pvp)' }}>
            <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 className="section-title" style={{ color: 'var(--portal-pvp)' }}>PVP & Rights Administration</h1>
                    <p className="text-muted">Intellectual Property & Royalties</p>
                </div>
                <div>
                    <button className="btn" style={{ background: 'var(--portal-pvp)', color: 'white' }}>+ New Application</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ borderBottom: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <button
                            onClick={() => setActiveTab('dus')}
                            style={{ padding: '0.5rem 1rem', borderBottom: activeTab === 'dus' ? '2px solid var(--portal-pvp)' : 'none', fontWeight: activeTab === 'dus' ? 600 : 400 }}
                        >
                            DUS Data Archive
                        </button>
                        <button
                            onClick={() => setActiveTab('cases')}
                            style={{ padding: '0.5rem 1rem', borderBottom: activeTab === 'cases' ? '2px solid var(--portal-pvp)' : 'none', fontWeight: activeTab === 'cases' ? 600 : 400 }}
                        >
                            Enforcement Cases
                        </button>
                    </div>

                    {activeTab === 'dus' && (
                        <Card title="DUS Testing Pipeline">
                            <SimpleTable columns={dusColumns} data={varieties} />
                        </Card>
                    )}

                    {activeTab === 'cases' && (
                        <Card title="Open Infringement Cases">
                            <div style={{ padding: '1rem', border: '1px solid #fee2e2', background: '#fef2f2', borderRadius: 'var(--radius-md)' }}>
                                <h4 style={{ color: '#991b1b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Lock size={16} /> Case #INF-2023-001
                                </h4>
                                <p style={{ marginTop: '0.5rem' }}>Suspected Unauthorized Propagation - Variety: Golden Wheat V1</p>
                                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#7f1d1d' }}>Actor: BioGenetics Inc (ACT-004)</p>
                                <button
                                    className="btn"
                                    style={{ background: '#b91c1c', color: 'white', marginTop: '1rem', fontSize: '0.85rem' }}
                                    onClick={() => handleInfringement('VAR-101')}
                                >
                                    Confirm Infringement & Flag Actor on Backbone
                                </button>
                            </div>
                        </Card>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Card title="International Visibility">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span>UPOV Database</span>
                            <span style={{ color: 'green' }}>● Synced</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span>Quarantine Portal</span>
                            <span style={{ color: 'green' }}>● Visible</span>
                        </div>
                        <hr style={{ margin: '1rem 0', opacity: 0.1 }} />
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                            <Globe size={48} style={{ opacity: 0.2 }} />
                            <p style={{ fontSize: '0.8rem' }}>Global Rights Data Exchange</p>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default PVPPortal;
