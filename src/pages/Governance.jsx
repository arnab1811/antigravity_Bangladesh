import React from 'react';
import Card from '../components/ui/Card';
import SimpleTable from '../components/ui/SimpleTable';
import { Users, Shield, FileText, Lock } from 'lucide-react';

const Governance = () => {
    const roles = [
        { role: 'Product Owner', name: 'Dr. Sarah Smith', department: 'Ministry of Agriculture', access: 'Full' },
        { role: 'Data Steward', name: 'John Doe', department: 'IT Services', access: 'Registry Write' },
        { role: 'Workflow Admin', name: 'Jane Roe', department: 'Regulatory Agency', access: 'Workflow Config' },
    ];

    const auditLog = [
        { id: 'LOG-001', user: 'System', action: 'Compliance Check', timestamp: '2023-10-27 10:00:00', status: 'Success' },
        { id: 'LOG-002', user: 'Admin User', action: 'User Role Update', timestamp: '2023-10-27 09:45:00', status: 'Success' },
        { id: 'LOG-003', user: 'QuarantineAgent', action: 'Risk Rule Edit', timestamp: '2023-10-26 14:20:00', status: 'Success' },
    ];

    const roleColumns = [
        { header: 'Role', accessor: 'role' },
        { header: 'Name', accessor: 'name' },
        { header: 'Department', accessor: 'department' },
        { header: 'Access Level', accessor: 'access' },
    ];

    const auditColumns = [
        { header: 'Log ID', accessor: 'id' },
        { header: 'User', accessor: 'user' },
        { header: 'Action', accessor: 'action' },
        { header: 'Timestamp', accessor: 'timestamp' },
        { header: 'Status', accessor: 'status' },
    ];

    return (
        <div className="container">
            <div style={{ margin: '2rem 0' }}>
                <h1 className="section-title">Capacity Building & Governance</h1>
                <p className="text-muted">System Administration, Access Control & Audit</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                <Card title="System Roles & Ownership">
                    <SimpleTable columns={roleColumns} data={roles} />
                </Card>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <Card title="Security Policies">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
                                <Shield size={24} color="var(--color-primary)" />
                                <div>
                                    <h4 style={{ fontWeight: 600 }}>Multi-Factor Authentication</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Enforced for all Admin users</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
                                <Lock size={24} color="var(--color-primary)" />
                                <div>
                                    <h4 style={{ fontWeight: 600 }}>Data Encryption</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>AES-256 at rest, TLS 1.3 in transit</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="Digital Signatures">
                        <div style={{ textAlign: 'center', padding: '1rem' }}>
                            <FileText size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>All registry updates are cryptographically signed.</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Current Key ID: 0x8F...3A</p>
                        </div>
                    </Card>
                </div>

                <Card title="Recent Audit Logs">
                    <SimpleTable columns={auditColumns} data={auditLog} />
                </Card>
            </div>
        </div>
    );
};

export default Governance;
