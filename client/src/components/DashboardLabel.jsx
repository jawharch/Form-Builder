import React from 'react';
import { useDrag } from 'react-dnd';

const DashboardLabel = ({ label, type }) => {
    const [{ isDragging }, drag] = useDrag({
        type, 
        item: { type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                border: '1px solid #000', 
                padding: '8px',
                margin: '8px',
            }}
        >
            {label}
        </div>
    );
};

export default DashboardLabel;
