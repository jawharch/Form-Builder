import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DashboardLabel from './DashboardLabel';
import FormBuilder from './FormBuilder';
import {Modal,Button,Form} from 'react-bootstrap'



const Dashboard = () => {
    const [formBuilders, setFormBuilders] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createNewFormBuilder = () => {
        const newForm = {
            id: formBuilders.length + 1,
            name: `Form ${formBuilders.length + 1}`,
            fields: [],
        };

        setFormBuilders([...formBuilders, <FormBuilder key={formBuilders.length} formElements={newForm} />]);
    };

    return (
        <>
        

        
        <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
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
        </>
        
    );
};

export default Dashboard;
