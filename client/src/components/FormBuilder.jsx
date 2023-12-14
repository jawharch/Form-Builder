import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Field from './Field'; 
import { Modal, Button, Form } from 'react-bootstrap';
import {useForm} from 'react-hook-form'
import { DevTool } from "@hookform/devtools";
const FormBuilder = ({formElements}) => {
    const [formFields, setFormFields] = useState([]);
    const [draggedFieldDetails, setDraggedFieldDetails] = useState(null);
    const [showModalInputs, setshowModalInputs] = useState(false);
    const [showModalChechbox, setshowModalChechbox] = useState(false);
    const [showModalSelect, setshowModalSelect] = useState(false);
    const [inputId, setInputId] = useState('');
    const [inputLabel, setInputLabel] = useState('');
    const [inputPlaceholder, setInputPlaceholder] = useState('');
    const [inputCondition, setInputCondition] = useState('');
    const defaultValues = {};
    formFields.forEach((field) => {
        
        defaultValues[field.id] = field.defaultValue || ''
    });

    const form = useForm({
        defaultValues,
        mode:'all' 
    });
    const {register,control,handleSubmit,formState,getValues,setValue,reset}=form
    const {errors,isValid,isDirty}=formState
    const onSubmit = (data) => {
        console.log(data); }


    const [, drop] = useDrop({
        accept: ['text', 'checkbox', 'radio','number','password','email','select','option','date','button'], 
        drop(item) {
            if (item.type === 'checkbox' || item.type === 'radio') {
                setshowModalChechbox(true);
                setDraggedFieldDetails(item.type);
            }
            else if(item.type === 'select')
            {
                setshowModalSelect(true);
                setDraggedFieldDetails(item.type);
                

            }
           

            
             else {
                setDraggedFieldDetails(item.type);
                setshowModalInputs(true)
            }
        },
    });

    const addField = (type) => {
        if (type === 'checkbox' || type === 'radio') {
            const newField = <Field key={formFields.length} type={type} />
            setFormFields([...formFields, newField])
        } else {
            const newField = {
                id: inputId,
                label: inputLabel,
                placeholder: inputPlaceholder,
                condition: inputCondition,
                type: draggedFieldDetails, 
            };
            setFormFields([...formFields, newField])
            handleClose();
        }
    };
    const handleSaveCheckboxLabel = () => {
        const newField = {
            id:inputId,
            
            label: inputLabel,
            type: draggedFieldDetails,
        };
        setFormFields([...formFields, newField]);
        setshowModalChechbox(false)
        setInputLabel("")
        setInputId("")
    };
 

    




    const handleClose = () => {
        setshowModalInputs(false)
        setInputId('')
        setInputLabel('')
        setInputPlaceholder('')
        setInputCondition('')
    };



    const handleSave = () => {
        addField();
    };
    const handleDelete=()=>
    {

    }
    const handleUpdate=()=>
    {

    }


    return (
        <div className="form-builder-canvas" ref={drop}>
            <h2 style={{textAlign:'center'}}> {formElements.name}</h2>
            <form className="form-fields-container"  onSubmit={handleSubmit(onSubmit)} noValidate>
                
            {formFields.map((field, index) => (
                    <div key={index}>
                        {React.isValidElement(field) ? (
                            field
                        ) : (
                            <div>
                                <label className='label' htmlFor={field.id}>{field.label}</label>
                                <input
                                className={ field.type==='radio'||field.type==='checkbox'?'radio':'input'}
                                    type={field.type}
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    {
                                        ...register(field.id,{
                                           
                                            required:{
                                                value: true,
                message: field.condition
                                            },
                                            ...(field.type === 'email' && {
                                                pattern: {
                                                  value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                  message: 'Invalid email format'
                                                }
                                              })
                                            
                                        })
                                    }
                                    
                                />
                                <p className='error'>{errors[field.id]?.message}</p>
                                
                                
                            </div>
                        )}
                        
                    </div>
                ))}
                <button className='submit-button-form' type='submit'  disabled={!isDirty ||  !isValid} >Submit</button>
            </form>
            <DevTool control={control}/>
            {console.log(formFields)}

            <Modal show={showModalInputs} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Input Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="inputId">
                        <Form.Label>Input ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={inputId}
                            onChange={(e) => setInputId(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="inputLabel">
                        <Form.Label>Input Label</Form.Label>
                        <Form.Control
                            type="text"
                            value={inputLabel}
                            onChange={(e) => setInputLabel(e.target.value)}
                        />
                    </Form.Group>
                    
                        
                            
                            <Form.Group controlId="inputPlaceholder">
                        <Form.Label>Input Placeholder</Form.Label>
                        <Form.Control
                            type="text"
                            value={inputPlaceholder}
                            onChange={(e) => setInputPlaceholder(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="inputCondition">
                        <Form.Label>Select Input Condition</Form.Label>
                        <Form.Control
                            type="text"
                            value={inputCondition}
                            onChange={(e) => setInputCondition(e.target.value)}
                        />
                    </Form.Group>
                    

                      
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal show={showModalChechbox} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Checkbox Label</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="inputLabel">
                        
                        <Form.Label>Checkbox Label</Form.Label>
                        <Form.Group controlId="inputId">
                        <Form.Label>Input ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={inputId}
                            onChange={(e) => setInputId(e.target.value)}
                        />
                    </Form.Group>
                        
                        <Form.Control
                            type="text"
                            value={inputLabel}
                            onChange={(e) => setInputLabel(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="checkboxPreview">
                        <Form.Check
                            type="checkbox"
                            id="exampleCheckbox"
                            label={inputLabel || 'Label Preview'}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveCheckboxLabel}>
                        Save Label
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
            );
};

export default FormBuilder;
