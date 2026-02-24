import React, { useState } from 'react';
import { useBackbone } from '../context/BackboneContext';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { ShieldCheck, AlertCircle, FileText, CheckCircle } from 'lucide-react';

const RegulatoryPortal = () => {
    const { actors, licenses } = useBackbone();
    // Mock current user
    const currentUser = actors.find(a => a.id === 'ACT-001'); // GreenValley
    const userLicense = licenses.find(l => l.actorId === currentUser?.id);

    const [formStep, setFormStep] = useState(0);

    if (!currentUser) return <div>Loading...</div>;

    return (
        <div className="container" style={{ borderTop: '4px solid var(--portal-regulatory)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0' }}>
                <div>
                    <h1 className="section-title" style={{ color: 'var(--portal-regulatory)' }}>Seed Regulatory Portal</h1>
                    <p className="text-muted">Welcome, {currentUser.name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>License Status</p>
                    <StatusBadge status={userLicense?.status || 'Unknown'} />
                </div>
            </div>

            {/* Compliance Alert */}
            {currentUser.complianceStatus === 'Flagged' && (
                <div style={{
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <AlertCircle size={24} color="#DC2626" />
                    <div>
                        <h3 style={{ color: '#991B1B', fontSize: '1rem', fontWeight: 600 }}>Compliance Alert Active</h3>
                        <p style={{ color: '#7F1D1D', fontSize: '0.9rem' }}>
                            Your organization has been flagged for non-compliance in the National Backbone.
                            License renewal and new variety applications are blocked.
                        </p>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                {/* Main Action Area: Variety Application */}
                <Card title="New Variety Release Application">
                    {formStep === 0 && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Variety Name</label>
                                    <input type="text" placeholder="e.g. Super Wheat 2024" style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} disabled={currentUser.complianceStatus === 'Flagged'} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Crop Type</label>
                                    <select style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} disabled={currentUser.complianceStatus === 'Flagged'}>
                                        <option>Wheat</option>
                                        <option>Maize</option>
                                        <option>Rice</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>DUS Test Data Reference</label>
                                <input type="text" placeholder="UUID from PVP Portal" style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} disabled={currentUser.complianceStatus === 'Flagged'} />
                            </div>

                            <button
                                className="btn btn-primary"
                                disabled={currentUser.complianceStatus === 'Flagged'}
                                onClick={() => setFormStep(1)}
                                style={{ opacity: currentUser.complianceStatus === 'Flagged' ? 0.5 : 1, width: '100%' }}
                            >
                                {currentUser.complianceStatus === 'Flagged' ? 'Application Blocked' : 'Submit Application'}
                            </button>
                        </div>
                    )}

                    {formStep === 1 && (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <CheckCircle size={48} color="var(--portal-regulatory)" style={{ marginBottom: '1rem' }} />
                            <h3>Application Submitted</h3>
                            <p className="text-muted">Your application ID is VAR-{Math.floor(Math.random() * 1000)}</p>
                            <button className="btn btn-secondary" onClick={() => setFormStep(0)} style={{ marginTop: '1rem' }}>Start New Application</button>
                        </div>
                    )}
                </Card>

                {/* Sidebar Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Card title="Quick Actions">
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}><FileText size={16} /> Seed Renewal</button></li>
                            <li><button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}><ShieldCheck size={16} /> Request Inspection</button></li>
                        </ul>
                    </Card>

                    <Card title="Pending Actions">
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <p style={{ marginBottom: '0.5rem' }}>• <strong>VAR-102</strong> DUS Report Pending</p>
                            <p>• <strong>LIC-701</strong> Renewal due in 30 days</p>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default RegulatoryPortal;
