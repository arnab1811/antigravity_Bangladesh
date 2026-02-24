import React from 'react';

const SimpleTable = ({ columns, data, onRowClick }) => {
    return (
        <div style={{ overflowX: 'auto', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rIdx) => (
                        <tr
                            key={rIdx}
                            onClick={() => onRowClick && onRowClick(row)}
                            style={{
                                borderBottom: '1px solid #f1f5f9',
                                cursor: onRowClick ? 'pointer' : 'default',
                                transition: 'background 0.1s'
                            }}
                            onMouseEnter={(e) => onRowClick && (e.currentTarget.style.background = '#f8fafc')}
                            onMouseLeave={(e) => onRowClick && (e.currentTarget.style.background = 'white')}
                        >
                            {columns.map((col, cIdx) => (
                                <td key={cIdx} style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                    {col.render ? col.render(row) : row[col.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SimpleTable;
