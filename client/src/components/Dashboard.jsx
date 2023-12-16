import React, { useState,useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DashboardLabel from './DashboardLabel';
import FormBuilder from './FormBuilder';
import {Modal,Button,Form, Toast} from 'react-bootstrap'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'



const Dashboard = () => {
    const [formBuilders, setFormBuilders] = useState([]);
    const [show, setShow] = useState(false);
    const [formName, setFormName] = useState('');
    const [formNameUpdated, setformNameUpdated] = useState('');
    const [selectedColor, setselectedColor] = useState('');
    const [selectedColorupdated, setselectedColorupdated] = useState('#ffffff');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setshowModal] = useState(false);
    const [selectedFormId, setSelectedFormId] = useState('');
    const toast = useToast()

    const handleClose = () => setShow(false)
    const handleClose2 = () => setshowModal(false)
    ;
    const handleShow = () => setShow(true);
 
   
    const createNewFormBuilder =async () => {
        const newForm = {
            id: formBuilders.length + 1,
            name: formName,
            backgroundColor: selectedColor,
            fields: [],
        };
        try {
            setLoading(true)
            const res=await axios.post('http://localhost:4000/api/create',newForm)
            const createdForm = res.data;
            setLoading(false)
            if(!res.data)
            {
                setError(res.data.message)
            }
            setFormBuilders([...formBuilders, <FormBuilder key={formBuilders.length} formElements={createdForm} />]);
            setselectedColor('#ffffff'); 
            handleClose();
            setFormName('')
            toast({
                title: `${createdForm.name} created !`,
                status: 'success',
                position:'bottom-right',
                isClosable: true,
              })
             
            
        } catch (error) {
            setError(error.message)
            setLoading(false)
            
        }

      
    }
   
    const handleUpdate = (formId) => {
        setSelectedFormId(formId);
        setshowModal(true);
        
    };
    const handleCloseUpdateModal = () => {
        setshowModal(false);
        setSelectedFormId('');
        
    };
    
    const SaveUpdate = async () => {
        const updatedForm = {
            name: formNameUpdated, 
            backgroundColor: selectedColorupdated, 
        };
    
        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:4000/api/update/${selectedFormId}`, updatedForm);
    
            if (!res.data) {
                setError(res.data.message);
            } else {
               
                const updatedFormData = res.data;
    
            
                const updatedBuilders = formBuilders.map((builder) => {
                    if (builder.props.formElements._id === selectedFormId) {
                        return <FormBuilder key={selectedFormId} formElements={updatedFormData} />;
                    }
                    return builder;
                });
    
                setFormBuilders(updatedBuilders);
                setselectedColorupdated('#ffffff');
                handleCloseUpdateModal();
                setformNameUpdated('');
                toast({
                    title: `${updatedFormData.name} updated!`,
                    status: 'success',
                    position: 'bottom-right',
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
  
    const handleDelete=async(FormId)=>
    {
        try {
            setLoading(true)
            const res=await axios.delete(`http://localhost:4000/api/delete/${FormId}`)
            console.log(res.data)
            setLoading(false)
            const updatedForms = formBuilders.filter(form => form.props.formElements._id !== FormId);
            setFormBuilders(updatedForms);
            toast({
                title: `${res.data}`,
                status: 'success',
                position:'bottom-right',
                isClosable: true,
              })
        } catch (error) {
            setError(error.message)
            setLoading(false)

            
        }

    }
  

 

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
                                onChange={(e)=>setselectedColor(e.target.value)}
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
            <Modal show={showModal} onHide={handleClose}>
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
                                value={formNameUpdated}
                                onChange={(e) => setformNameUpdated(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="backgroundColor">
                            <Form.Label>Form Color</Form.Label>
                            <Form.Control
                                type="color"
                                value={selectedColorupdated}
                                onChange={(e)=>setselectedColorupdated(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button disabled={!formNameUpdated} variant="primary"  onClick={SaveUpdate}>
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
                    <DashboardLabel label="Submit Button" type="button" />

                    
                    
                </div>

                <div className="right-section">
                   

                    <div className="form-builders-container">
                        <div className='form-builders-header'>
                        <h2 style={{textAlign:'center',fontWeight:'bold',fontSize:'40px',color:'black'}}>Forms Builder</h2>
                        <button className='create-button'  onClick={()=>setShow(true)}>Add Form</button>

                        </div>
                        
                        <div className="form-builder-list" >

                        
                        {formBuilders.map((formBuilder, index) => (
                            <div className="form-builder-item"  style={{backgroundColor:formBuilder.props.formElements.backgroundColor}}  key={index}>{formBuilder}
                            <div className='button-container' >
                            <button className="update-button" onClick={() => handleUpdate(formBuilder.props.formElements._id)}>Update</button>
                            <button className="delete-button" onClick={() => handleDelete(formBuilder.props.formElements._id)}>Delete</button>
                        </div>
                            </div>
                            
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
