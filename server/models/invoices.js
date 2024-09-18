const mongoose=require('mongoose');
const invoiceschema=new mongoose.Schema({

 user_id:String,
 items:Object,
 totalAmount:String,
 payment_id:String,
 booking_id:String,
 date:String,
})

const invoicemodel=mongoose.model("invoices",invoiceschema)

module.exports=invoicemodel;