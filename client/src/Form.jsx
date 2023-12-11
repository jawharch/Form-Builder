
import {useForm,useFieldArray} from 'react-hook-form'
import { DevTool } from "@hookform/devtools";

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
                hobbies:"Musique",
                socials:[
                    {social:""}
                ],

                
            },
            mode:'all'
            
        }
    )
    const {register,control,handleSubmit,formState}=form
    const {errors}=formState
    const {fields,append,remove}=useFieldArray(
        {
          name:'socials',control
        }
      )
  return (
    <div>
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
     
      
      <div className='form-control'>
      <label htmlFor='country'>
        Select your country:
        </label>

        <select {...register('country')} defaultValue={form.watch('country')}>

          <option value="TUN">Tunisia</option>
          <option value="FRA">France</option>
          <option value="CAN">Canada</option>
          <option >US</option>
          
        </select>
        {
            console.log(form.watch('country'))
        }
      

      </div>
      
            <div>
                <label >Socials</label>
                <div>
            {
              fields.map((field,index)=>
              {
                return(
                <div className='form-control' key={field.id}>
                  <input type='text' {...register(`socials[${index}].social`)}/>
                  {
                    index>0 &&(
                      <button type='button' onClick={()=>remove(index)}>Remove</button>
                    )

                  }
                </div>
                )
              })

            }
            <button type='button' onClick={()=>append({number:""})}>Add social</button>
          </div>
            </div>


        </form>

        
    <DevTool control={control}/>
    </div>
  )
}

export default Form
