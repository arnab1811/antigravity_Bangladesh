import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackbone } from '../context/BackboneContext';
import Card from '../components/ui/Card';
import { ShieldCheck, Plane, Scale, Briefcase, Activity, AlertTriangle, Play, CheckCircle } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();
    const { actors, triggerNonCompliance } = useBackbone();
    const [simulationStep, setSimulationStep] = useState(0); // 0: Idle, 1: Running, 2: Done

    const runSimulation = () => {
        if (simulationStep > 0) return;

        const targetActor = actors.find(a => a.complianceStatus === 'Clean' && a.id === 'ACT-001'); // Target specific actor for demo
        if (!targetActor) {
            alert("Please refresh data to reset simulation (ACT-001 is already flagged)");
            return;
        }

        setSimulationStep(1);

        // Step 1: Detect
        setTimeout(() => {
            // Step 2: Log to Backbone and Flag
            triggerNonCompliance(targetActor.id, 'Border Inspection Failed');
            setSimulationStep(2);
        }, 2000);
    };

    const portals = [
        {
            title: 'Seed Regulatory Portal',
            path: '/regulatory',
            icon: ShieldCheck,
            color: 'var(--portal-regulatory)',
            desc: 'Variety Release, Seed Certification & Licensing'
        },
        {
            title: 'Quarantine & Border',
            path: '/quarantine',
            icon: Plane,
            color: 'var(--portal-quarantine)',
            desc: 'Import Permits, Risk Analysis & Inspection'
        },
        {
            title: 'PVP & Rights',
            path: '/pvp',
            icon: Scale,
            color: 'var(--portal-pvp)',
            desc: 'Plant Variety Protection & DUS Testing'
        },
        {
            title: 'Local Seed Business',
            path: '/business',
            icon: Briefcase,
            color: 'var(--portal-business)',
            desc: 'Market Demand, Planning & Compliance'
        },
    ];

    return (
        <div className="container">

            {/* Hero / Simulation Section */}
            <section style={{ marginBottom: '3rem', marginTop: '1rem' }}>
                <div style={{
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-dark) 100%)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '3rem',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                            National Seed & Plant <br /> Regulatory Backbone
                        </h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
                            A unified digital ecosystem connecting regulation, quarantine, PVP, and industry.
                        </p>

                        <button
                            onClick={runSimulation}
                            className="btn"
                            style={{
                                backgroundColor: 'white',
                                color: 'var(--color-primary)',
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem'
                            }}
                        >
                            {simulationStep === 0 && <><Play size={20} /> Simulate Border Non-Compliance Event</>}
                            {simulationStep === 1 && <><Activity size={20} className="spin" /> Processing Event...</>}
                            {simulationStep === 2 && <><CheckCircle size={20} /> Event Logged to Backbone</>}
                        </button>
                    </div>

                    {/* Decorative Background */}
                    <Activity
                        size={400}
                        style={{
                            position: 'absolute',
                            right: '-50px',
                            top: '-50px',
                            opacity: 0.1,
                            transform: 'rotate(-15deg)'
                        }}
                    />
                </div>

                {/* Simulation Feedback Modal/Toast Mockup */}
                {simulationStep === 2 && (
                    <div style={{
                        marginTop: '1.5rem',
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        animation: 'slideIn 0.5s ease-out'
                    }}>
                        <div style={{ background: '#F87171', color: 'white', padding: '0.5rem', borderRadius: '50%' }}>
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 'bold', color: '#991B1B' }}>Compliance Alert Triggered</h4>
                            <p style={{ fontSize: '0.9rem', color: '#7F1D1D' }}>
                                Actor <strong>GreenValley Seeds Ltd</strong> flagged. License suspended in Regulatory Portal.
                            </p>
                        </div>
                        <button
                            onClick={() => setSimulationStep(0)}
                            style={{ marginLeft: 'auto', color: '#991B1B', fontWeight: 600, fontSize: '0.9rem' }}
                        >
                            Reset
                        </button>
                    </div>
                )}
            </section>

            {/* Portals Grid */}
            <section>
                <h2 className="section-title">Access Portals</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {portals.map((portal) => (
                        <Card
                            key={portal.title}
                            title={portal.title}
                            color={portal.color}
                            onClick={() => navigate(portal.path)}
                            footer={<span style={{ fontWeight: 600, color: portal.color, fontSize: '0.9rem' }}>Enter Portal &rarr;</span>}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    background: portal.color,
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'white',
                                    opacity: 0.9
                                }}>
                                    <portal.icon size={28} />
                                </div>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                {portal.desc}
                            </p>
                        </Card>
                    ))}
                </div>
            </section>

            <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <p>National Digital Backbone v1.0 | Data Standards | Audit | Evidence Rules</p>
            </footer>

            <style>{`
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .spin {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `}</style>
        </div>
    );
};

export default Landing;
