import React from 'react';

const StatusBadge = ({ status }) => {
    let type = 'info';

    const s = status.toLowerCase();
    if (['active', 'approved', 'clean', 'certified', 'low risk'].includes(s)) type = 'success';
    if (['pending', 'suspended', 'expired', 'in testing'].includes(s)) type = 'warning';
    if (['flagged', 'rejected', 'high risk', 'blocked'].includes(s)) type = 'danger';

    return (
        <span className={`badge badge-${type}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
