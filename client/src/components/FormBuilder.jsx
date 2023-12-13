import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Field from './Field'; 

const FormBuilder = ({formElements}) => {
    const [formFields, setFormFields] = useState([]);

    const [, drop] = useDrop({
        accept: ['text', 'checkbox', 'radio','number','password','email','select','option','date'], 
        drop(item) {
            addField(item.type); 
        },
    });

    const addField = (type) => {
        const newField = <Field key={formFields.length} type={type} />;
        setFormFields([...formFields, newField]);
    };

    return (
        <div className="form-builder-canvas" ref={drop}>
            <h2> {formElements.name}</h2>
            <div className="form-fields-container">
                
                {formFields.map((field, index) => (
                    <div key={index}>{field}</div>
                    
                ))}
            </div>
            {console.log(formFields)}
        </div>
    );
};

export default FormBuilder;
