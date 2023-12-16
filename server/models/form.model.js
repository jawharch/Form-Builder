

const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  backgroundColor: String,
  
 
});
const Form = mongoose.model('Form', formSchema);

module.exports=Form
