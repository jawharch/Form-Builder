const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const cookieparser=require('cookie-parser')
const formRouter=require('./routes/form.route')
dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>console.log('connected')).catch((err)=>console.log(err))
const app=express()
app.use(express.urlencoded({
    extended:true
}))
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieparser())
app.use('/api/',formRouter)



app.listen(4000,()=>
{
    console.log('Server is running on port 3000')
})