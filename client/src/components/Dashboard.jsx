import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DashboardLabel from './DashboardLabel';
import FormBuilder from './FormBuilder';
import {Modal,Button,Form} from 'react-bootstrap'



const Dashboard = () => {
    const [formBuilders, setFormBuilders] = useState([]);
    const [show, setShow] = useState(false);
    const [formName, setFormName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#ffffff');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createNewFormBuilder = () => {
        const newForm = {
            id: formBuilders.length + 1,
            name: formName,
            backgroundColor: selectedColor,
            fields: [],
        };

        setFormBuilders([...formBuilders, <FormBuilder key={formBuilders.length} formElements={newForm} />]);
        setSelectedColor('#ffffff'); 
        handleClose();
        setFormName('')
    };
  

 

    return (
        <>
        

        
        <Button variant="primary" onClick={handleShow} style={{display:'none'}}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Form Name</Form.Label>
                            
                            <Form.Control
                                type="text"
                                placeholder="Enter form name"
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="backgroundColor">
                            <Form.Label>Form Color</Form.Label>
                            <Form.Control
                                type="color"
                                value={selectedColor}
                                onChange={(e)=>setSelectedColor(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={!formName} variant="primary"  onClick={() => {
                            handleClose();
                            createNewFormBuilder();
                        }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
      
        
        <DndProvider backend={HTML5Backend}>
            <div className="dashboard">
                <div className="sidebar">
                    <h2 style={{textAlign:'center',fontWeight:'bold'}} >Input Options</h2>
                    <DashboardLabel label="Text Field" type="text" />
                    <DashboardLabel label="Password Field" type="password"/>
                    <DashboardLabel label="Email Field" type="email"/>
                    <DashboardLabel label="Checkbox" type="checkbox" />
                    <DashboardLabel label="RadioBox" type="radio" />
                    <DashboardLabel label="Number Field" type="number" />
                    <DashboardLabel label="Select" type="select" />
                    <DashboardLabel label="Date" type="date" />
                </div>

                <div className="right-section">
                   

                    <div className="form-builders-container">
                        <div className='form-builders-header'>
                        <h2 style={{textAlign:'center',fontWeight:'bold',fontSize:'40px',color:'black'}}>Form Builder</h2>
                        <button className='create-button' onClick={()=>setShow(true)}>Add Form</button>

                        </div>
                        
                        <div className="form-builder-list" >

                        
                        {formBuilders.map((formBuilder, index) => (
                            <div className="form-builder-item"  style={{backgroundColor:formBuilder.props.formElements.backgroundColor}}  key={index}>{formBuilder}</div>
                        ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        </DndProvider>
        </>
        
    );
};

export default Dashboard;
