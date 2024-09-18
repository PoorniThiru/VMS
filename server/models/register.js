const mongoose=require('mongoose');
const registerscheme=new mongoose.Schema({

 firstname:String,
 lastname:String,
 email:String,
 password:String
})

const registermodel=mongoose.model("register",registerscheme)

module.exports=registermodel;