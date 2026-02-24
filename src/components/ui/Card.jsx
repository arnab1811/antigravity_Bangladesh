import React from 'react';

const Card = ({ title, children, footer, onClick, className = '', color }) => {
    return (
        <div
            className={`card ${className}`}
            onClick={onClick}
            style={{
                cursor: onClick ? 'pointer' : 'default',
                borderTop: color ? `4px solid ${color}` : undefined,
                transition: onClick ? 'transform 0.2s, box-shadow 0.2s' : undefined
            }}
            onMouseEnter={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }
            }}
            onMouseLeave={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }
            }}
        >
            {title && <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>{title}</h3>}
            <div style={{ color: 'var(--text-primary)' }}>
                {children}
            </div>
            {footer && (
                <div style={{ marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid #f1f5f9' }}>
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
