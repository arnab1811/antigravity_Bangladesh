import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
    return (
        <header style={{
            height: '64px',
            background: 'white',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                <Search size={20} />
                <input
                    type="text"
                    placeholder="Search registrations, actors, batches..."
                    style={{
                        border: 'none',
                        outline: 'none',
                        fontSize: '0.9rem',
                        width: '300px'
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button style={{ position: 'relative' }}>
                    <Bell size={20} color="var(--text-secondary)" />
                    <span style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: '8px',
                        height: '8px',
                        background: 'var(--color-danger)',
                        borderRadius: '50%'
                    }}></span>
                </button>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>v1.0.0-mock</span>
            </div>
        </header>
    );
};

export default Header;
