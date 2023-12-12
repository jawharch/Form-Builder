
import {useForm,useFieldArray} from 'react-hook-form'
import { DevTool } from "@hookform/devtools";


import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';


const Form = () => {
    const form=useForm(
        {
            defaultValues:
            {
                username:'Jawhar',
                name:'Chouri',
                email:"",
                age:"",
                
                gender:"male",
                country:"Tunisia",
                
                hobbies:[
                    {hobbie:""}
                ],

                
            },
            mode:'all'
            
        }
    )
    const {register,control,handleSubmit,formState,getValues,setValue,reset}=form
    const {errors,isValid,isDirty}=formState
    const {fields,append,remove}=useFieldArray(
        {
          name:'hobbies',control
        }
      )
      const [selectedCountry, setSelectedCountry] = useState('TUN');
      useEffect(() => {
        setValue('country', selectedCountry);
      }, [setValue, selectedCountry]);
    
      
  return (
    <div >
        <h1>Welcome</h1>
        <form onSubmit={handleSubmit() } noValidate> 
        
            <div className='form-control'>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' {
                    ...register("username",{
                        required:{
                            value:true,
                            message:'username is required'
                        }
                    })
                } />
                <p className='error'>{errors.username?.message}</p>

            </div>
            <div className='form-control'>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' {
                    ...register("name",{
                        required:{
                            value:true,
                            message:'name is required'
                        }
                    })
                } />
                <p className='error'>{errors.name?.message}</p>

            </div>
            <div className='form-control'>
        <label htmlFor='email'>E-mail</label>
        <input type='email' id='email ' {...register("email",{
          pattern:{
          value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message:'INVALID email format'},
          
            
          
            

          
          })}/>
        <p  className='error'>{errors.email?.message}</p>
        </div>
        <div className='form-control'>
                <label htmlFor="AGE">Age</label>
                <input type="number" id='age' {
                    ...register("age",{
                        
                        required:{
                            value:true,
                            message:'age is required',
                            
                        },
                        pattern: /^[0-9]+$/,
                        min: {
                            value: 18,
                            message: 'age must be over 18',
                          },
                          
                    })
                }  />
                <p className='error'>{errors.age?.message}</p>

            </div>
            <div className='form-control-check'>

            
            <label>
         Male
        <input type="radio" value="male" {...register('gender')} defaultChecked={form.watch('gender') === 'male'} />
      </label>
      <label>
        Female
        <input type="radio" value="female" {...register('gender')} defaultChecked={form.watch('gender') === 'female'} />
      </label>
      </div>
     
      
      <div className='form-control-check'>
      <label htmlFor='country'>
       Country
        </label>

        <FormControl sx={{ m: 1, minWidth: 100 }}>
        <Select
        {
            ...register('country')
        }
        value={form.watch('country')}
        style={{color:'white'}}
        onChange={(e) => setSelectedCountry(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          
          <MenuItem value="Tunisia" >Tunisia</MenuItem>
          <MenuItem value="France">France</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
        </Select>
        
      </FormControl>
        
      

      </div>
      
            <div>
                <label >Hobbies</label>
                <div>
            {
              fields.map((field,index)=>
              {
                return(
                <div className='form-control' key={field.id}>
                  <input type='text' {...register(`hobbies[${index}].hobbie`,{
                    required:{
                        value:true, message:"One hobbie  is required."
                    }
                  })}/>
                  {
                    index>0 &&(
                      <button type='button' className='button1' onClick={()=>remove(index)}>Remove</button>
                    )

                  }
                </div>
                )
              })

            }
            <button type='button' className='button' onClick={()=>append({hobbie:""})}>Add Hobbie</button>
          </div>
            </div>
            {
                console.log(getValues())
            }
            <div>
                
            </div>
            <div className='buttons' >
            <button type='submit'  className='submitbutton' disabled={!isDirty ||  !isValid}>Submit</button>
            


            </div>
           

        </form>

        
    <DevTool control={control}/>
    </div>
  )
}

export default Form
