import React from 'react';

const Field = ({ type, options, ...props }) => {
    switch (type) {
        case 'text':
            return <input type="text" {...props} />;
        case 'password':
            return <input type="password" {...props} />;
        case 'email':
            return <input type="email" {...props} />;
        case 'number':
            return <input type="number" {...props} />;
        case 'checkbox':
            return <input type="checkbox" {...props} />;
        case 'radio':
            return <input type="radio" {...props} />;
        case 'date':
            return <input type="date" {...props} />;
        
        case 'select':
            return (
                <select {...props}>
                    {options && options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        
        default:
            return null;
    }
};

export default Field;
