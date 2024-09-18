const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000
const registermodel=require('./models/register')
const invoicemodel=require('./models/invoices')
const sampledata=require('./itemsCollection')


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));
app.use(cors())

// connect to the mongodb database
 connectDB() 

//  app.use('/api/items', require("./routes/items"))
// app.use('/api/payment', cors(), require("./routes/payment"))

app.get('/api/items',(req,res)=>{
    return res.json(sampledata)
})


app.post('/register',(req,res)=>{
    // const [firstname,lastname,email,password]=req.body;
    console.log(req.body)
    registermodel.create(req.body)
    .then(register=>res.json(register))
    .catch(err=>res.json(err))
})

app.post('/invoicedata',(req,res)=>{
    // const [firstname,lastname,email,password]=req.body;
    invoicemodel.create(req.body)
    .then(register=>res.json(register))
    .catch(err=>res.json(err))
})

app.post('/invoicelist',(req,res)=>{
     console.log(req.body)
    invoicemodel.find({user_id:req.body.user_id})
    .then(invdatas=>{console.log(invdatas); res.json(invdatas)})
    .catch(err=>{console.log(err);res.json(err)})

})

app.post('/login',(req,res)=>{
     
    registermodel.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            if(user.password === req.body.password){
                res.json(user)
            }else{
                res.json("Password Incorrect")
            }
        }else{
            
            res.json("E-mail not registered")
        }
    })
    .catch(err=>{
        console.log(err)
        res.json(err)})
})


app.listen(PORT, console.log("Server is running on port ", PORT))