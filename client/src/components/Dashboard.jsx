import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DashboardLabel from './DashboardLabel';
import FormBuilder from './FormBuilder';


const Dashboard = () => {
    const [formBuilders, setFormBuilders] = useState([]);

    const createNewFormBuilder = () => {
        const newForm = {
            id: formBuilders.length + 1,
            name: `Form ${formBuilders.length + 1}`,
            fields: [],
        };

        setFormBuilders([...formBuilders, <FormBuilder key={formBuilders.length} formElements={newForm} />]);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="dashboard">
                <div className="sidebar">
                    <h2 style={{textAlign:'center',fontWeight:'bold'}} >Input Options</h2>
                    <DashboardLabel label="Text Field" type="text" />
                    <DashboardLabel label="Password Field" type="password"/>
                    <DashboardLabel label="Email Field" type="email"/>
                    <DashboardLabel label="Checkbox" type="checkbox" />
                    <DashboardLabel label="RadioBox" type="radiobox" />
                    <DashboardLabel label="Number Field" type="number" />
                    <DashboardLabel label="Select" type="select" />
                    <DashboardLabel label="Date" type="date" />
                </div>

                <div className="right-section">
                   

                    <div className="form-builders-container">
                        <h2 style={{textAlign:'center',fontWeight:'bold',fontSize:'40px'}}>Form Builder</h2>
                        <div className="form-builder-list" >

                        
                        {formBuilders.map((formBuilder, index) => (
                            <div className="form-builder-item" key={index}>{formBuilder}</div>
                        ))}
                        </div>
                        <button className='create-button' onClick={createNewFormBuilder}>Create Form</button>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default Dashboard;
