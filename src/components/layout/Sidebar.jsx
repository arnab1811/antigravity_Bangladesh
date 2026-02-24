import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Database, ShieldCheck, Plane, Scale, Briefcase, Users, FileText } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { to: '/', label: 'Overview', icon: LayoutDashboard },
        { to: '/admin', label: 'Backbone Registry', icon: Database },
        { to: '/regulatory', label: 'Seed Regulatory', icon: ShieldCheck, color: 'var(--portal-regulatory)' },
        { to: '/quarantine', label: 'Quarantine & Border', icon: Plane, color: 'var(--portal-quarantine)' },
        { to: '/pvp', label: 'PVP & Rights', icon: Scale, color: 'var(--portal-pvp)' },
        { to: '/business', label: 'Local Business', icon: Briefcase, color: 'var(--portal-business)' },
        { to: '/governance', label: 'Governance', icon: Users },
    ];

    return (
        <aside style={{
            width: '260px',
            background: 'white',
            borderRight: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            position: 'sticky',
            top: 0
        }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-primary)' }}>GenBank OS</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Regulatory Backbone</p>
            </div>

            <nav style={{ flex: 1, padding: '1rem' }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    color: isActive ? 'white' : 'var(--text-secondary)',
                                    backgroundColor: isActive ? (item.color || 'var(--color-primary)') : 'transparent',
                                    fontWeight: isActive ? 600 : 500,
                                    transition: 'all 0.2s'
                                })}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                        AD
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>Admin User</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>System Administrator</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
