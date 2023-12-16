import React from 'react';

const Field = ({ type, options,isDragging,  ...props }) => {
    const styles = {
        border: isDragging ? '2px dashed #999' : '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        margin: '4px',
        backgroundColor: isDragging ? '#f2f2f2' : 'white',
        
    };
    switch (type) {
        case 'text':
            return <input type="text" style={styles} {...props} />;
        case 'password':
            return <input type="password" style={styles} {...props} />;
        case 'email':
            return <input type="email" style={styles} {...props} />;
        case 'number':
            return <input type="number" style={styles} {...props} />;
        case 'checkbox':
            return <input type="checkbox" style={styles} {...props} />;
        case 'radio':
            return <input type="radio" style={styles}  {...props} />;
        case 'date':
            return <input type="date" style={styles} {...props} />;
        case 'button':
            return <button type="submit" style={styles} {...props} >Submit</button>;
        
        case 'select':
            return (
                <select {...props} style={styles}>
                    {options && options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        
        default:
            return null
    }
};

export default Field;
