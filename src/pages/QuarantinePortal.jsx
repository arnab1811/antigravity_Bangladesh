import React, { useState } from 'react';
import { useBackbone } from '../context/BackboneContext';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { Plane, AlertTriangle, CheckCircle, XCircle, Search } from 'lucide-react';

const QuarantinePortal = () => {
    const { runRiskAssessment, triggerNonCompliance } = useBackbone();

    const [formData, setFormData] = useState({
        actorId: 'ACT-001',
        origin: 'Kenia',
        pestRisk: 'Low'
    });
    const [riskResult, setRiskResult] = useState(null);

    const handleRiskCheck = () => {
        setRiskResult(null); // Reset
        setTimeout(() => {
            const result = runRiskAssessment(formData);
            setRiskResult(result);
        }, 800);
    };

    const handleAction = (action) => {
        if (action === 'Destruction') {
            triggerNonCompliance(formData.actorId, 'Quarantine Destruction Order');
            alert("Compliance Event Logged: Actor Flagged");
        } else {
            alert(`Action Taken: ${action}`);
        }
        setRiskResult(null); // Reset
    };

    return (
        <div className="container" style={{ borderTop: '4px solid var(--portal-quarantine)' }}>
            <div style={{ margin: '2rem 0' }}>
                <h1 className="section-title" style={{ color: 'var(--portal-quarantine)' }}>Quarantine & Border Control</h1>
                <p className="text-muted">Import Risk Management Engine</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <Card title="Import Permit Risk Assessment">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Importer ID (Actor)</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    value={formData.actorId}
                                    onChange={e => setFormData({ ...formData, actorId: e.target.value })}
                                    style={{ flex: 1, padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                                />
                                <button className="btn btn-secondary"><Search size={16} /></button>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Origin Country</label>
                            <select
                                value={formData.origin}
                                onChange={e => setFormData({ ...formData, origin: e.target.value })}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                            >
                                <option>Kenia</option>
                                <option>Netherlands</option>
                                <option>India</option>
                                <option>USA</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Declared Pest Risk</label>
                            <select
                                value={formData.pestRisk}
                                onChange={e => setFormData({ ...formData, pestRisk: e.target.value })}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>

                        <button
                            onClick={handleRiskCheck}
                            className="btn"
                            style={{ background: 'var(--portal-quarantine)', color: 'white', marginTop: '1rem' }}
                        >
                            Run Risk Engine
                        </button>
                    </div>
                </Card>

                <Card title="Assessment Result">
                    {!riskResult ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            <Plane size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>Awaiting Input</p>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', animation: 'fadeIn 0.3s' }}>
                            <div style={{
                                background: riskResult.result === 'High Risk' ? '#FEF2F2' : '#F0FDF4',
                                padding: '2rem',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '2rem'
                            }}>
                                {riskResult.result === 'High Risk' ? <AlertTriangle size={48} color="#DC2626" /> : <CheckCircle size={48} color="#16A34A" />}
                                <h2 style={{ marginTop: '1rem', color: riskResult.result === 'High Risk' ? '#991B1B' : '#166534' }}>
                                    {riskResult.result}
                                </h2>
                                <p style={{ fontWeight: 600 }}>Recommendation: {riskResult.action}</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                                <button className="btn btn-secondary" onClick={() => handleAction('Release')}>Release</button>
                                <button className="btn btn-secondary" style={{ background: '#FEF3C7', color: '#92400E' }} onClick={() => handleAction('Treatment')}>Treatment</button>
                                <button className="btn" style={{ background: '#DC2626', color: 'white' }} onClick={() => handleAction('Destruction')}>Destruction</button>
                            </div>

                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                                * Selecting Destruction triggers auto-compliance event in Backbone.
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default QuarantinePortal;
