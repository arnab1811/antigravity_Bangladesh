import React from 'react';
import { useBackbone } from '../context/BackboneContext';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { Briefcase, TrendingUp, Package, Lock, ShoppingCart } from 'lucide-react';

const BusinessPortal = () => {
    const { actors, licenses } = useBackbone();
    // Assuming logged in as ACT-001 (GreenValley) for demo
    const currentUser = actors.find(a => a.id === 'ACT-001');
    const userLicense = licenses.find(l => l.actorId === currentUser?.id);
    const isLocked = currentUser?.complianceStatus === 'Flagged' || userLicense?.status !== 'Active';

    return (
        <div className="container" style={{ borderTop: '4px solid var(--portal-business)' }}>
            <div style={{ margin: '2rem 0' }}>
                <h1 className="section-title" style={{ color: 'var(--portal-business)' }}>Local Seed Business Portal</h1>
                <p className="text-muted">Market Demand & Production Planning</p>
            </div>

            {isLocked && (
                <div style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '1rem',
                    textAlign: 'center'
                }}>
                    <Lock size={48} color="#dc2626" />
                    <div>
                        <h2 style={{ color: '#991b1b' }}>Portal Access Restricted</h2>
                        <p style={{ color: '#7f1d1d' }}>
                            Your business license is currently suspended due to a compliance flag in the national registry.
                            Trade functionalities are disabled.
                        </p>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', opacity: isLocked ? 0.5 : 1, pointerEvents: isLocked ? 'none' : 'auto' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Card title="Market Demand" footer={<span className="text-muted">Updated: Today</span>}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '150px' }}>
                            <div style={{ width: '40px', height: '60%', background: '#ffddd2', borderRadius: '4px 4px 0 0' }}></div>
                            <div style={{ width: '40px', height: '80%', background: '#83c5be', borderRadius: '4px 4px 0 0' }}></div>
                            <div style={{ width: '40px', height: '50%', background: '#edf6f9', outline: '1px solid #83c5be', borderRadius: '4px 4px 0 0' }}></div>
                            <div style={{ width: '40px', height: '90%', background: 'var(--portal-business)', borderRadius: '4px 4px 0 0' }}></div>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 600 }}>Wheat Demand +15%</div>
                    </Card>

                    <Card title="Inventory" footer={<span className="text-muted">Total: 450 Tonnes</span>}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <Package size={24} color="var(--portal-business)" />
                            <div>
                                <p style={{ fontWeight: 600 }}>Certified Seed</p>
                                <p style={{ fontSize: '0.8rem' }}><StatusBadge status="In Stock" /></p>
                            </div>
                            <span style={{ marginLeft: 'auto', fontWeight: 700 }}>300T</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Package size={24} color="gray" />
                            <div>
                                <p style={{ fontWeight: 600 }}>Raw Material</p>
                                <p style={{ fontSize: '0.8rem' }}><StatusBadge status="Processing" /></p>
                            </div>
                            <span style={{ marginLeft: 'auto', fontWeight: 700 }}>150T</span>
                        </div>
                    </Card>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Card title="Quick Trade">
                        <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', background: 'var(--portal-business)' }}>
                            <ShoppingCart size={18} style={{ marginRight: '0.5rem' }} /> New Sale Order
                        </button>
                        <button className="btn btn-secondary" style={{ width: '100%' }}>
                            <TrendingUp size={18} style={{ marginRight: '0.5rem' }} /> Production Plan
                        </button>
                    </Card>

                    <div style={{ padding: '1.5rem', background: '#F0FDF4', borderRadius: 'var(--radius-md)', border: '1px solid #BBF7D0' }}>
                        <p style={{ color: '#166534', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Data Flow</p>
                        <div style={{ display: 'flex', fontSize: '0.8rem', gap: '0.5rem', color: '#15803d' }}>
                            <span>Market</span> ➔ <span>Plan</span> ➔ <span>Produce</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BusinessPortal;
