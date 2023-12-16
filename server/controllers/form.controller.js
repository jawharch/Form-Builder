const Form = require("../models/form.model");

exports.createForm=async(req,res,next)=>
{
    try {
        const form=await Form.create(req.body)
        await form.save();
        
        return res.status(201).json(
            
               form
            
        )
    }   catch (error) {
        res.status(500).json({ message: error.message })}
}
exports.deleteForm=async(req,res,next)=>
{
    try {
        await Form.findByIdAndDelete(req.params.id)
        res.status(200).json('Form has been deleted!')
    } catch (error) {
        res.status(500).json({ message: error.message })}
        
    }

    exports.updateForm=async(req,res,next)=>
    {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' })
        }
        try {
            const updatedForm=await Form.findByIdAndUpdate(req.params.id,req.body,{new:true})
            res.status(200).json(updatedForm)
            
        } catch (error) {
            res.status(500).json({ message: error.message })
            
        }
    }