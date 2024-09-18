import { Fragment, useContext, useState } from 'react';
import { CartItemsContext } from '../../../Context/CartItemsContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import CartCard from './CartCard/CartCard';

import './Cart.css'
import Button from '@mui/material/Button';
import axios from 'axios';
import { getUserData } from '../../services/Storage';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '350px',
  width: '45%',
  height: '400px',
  bgcolor: 'background.paper',
  border: '5px solid #FFE26E',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false);window.location.reload();}
    var amount=0;
    const [ openCheckoutModal, setOpenCheckoutModal] = useState(false);
    const handleCheckoutOpen = () => setOpenCheckoutModal(true);
    const handleCheckoutClose = () => setOpenCheckoutModal(false);

    const [address,setaddress]=useState(false)
    const handleaddressopen=()=>setaddress(true)
    const handleaddressclose=()=>setaddress(false)

    const cartItems= useContext(CartItemsContext);
    var date1=new Date();
    
    

    const handleCheckout = async () => {
        // if(cartItems.totalAmount > 0){
        //     const config = {
        //         reason: 'checkout',
        //         amount: cartItems.totalAmount
        //     }

        // await axios.post("http://localhost:5000/api/payment", config)
        //     .then((res) => {
        //             console.log(res.data)
        //             window.location.replace(res.data)
        //             handleCheckoutOpen()
        //         }
        //     )
        //     .catch((err) => console.log(err))
        // }
        // else {
        //     return
        // }
         
           
        if(cartItems.totalAmount > 0){
             amount= cartItems.totalAmount
        }

       // e.preventDefault();
        if(amount === ""){
        alert("please enter amount");
        }else{
          var options = {
            key: "rzp_test_nvMrDRWRJ7Gyu0",
            key_secret:"xSeeqqahOgekbMXPM6phC6wa",
            amount: amount *100,
            currency:"INR",
            name:"STARTUP_PROJECTS",
            description:"for testing purpose",
            handler: function(response){
              
              var booking_id="poorni" +Math.floor(Math.random() * 9999)
              var data={user_id:getUserData(),items:cartItems.items,totalAmount:cartItems.totalAmount,payment_id:response.razorpay_payment_id,booking_id:booking_id,date:date1.toISOString().split('T')[0]}
              axios.post("http://localhost:5000/invoicedata",data)
              .then((res)=>{
                cartItems.items=[];
                handleaddressclose()
                handleClose()
                handleCheckoutOpen()
                
              })
              .catch((err)=>console.log(err))
             
            },
            prefill: {
              name:"Poornima",
              email:"poorni0523@gmail.com",
              contact:"8660036984"
            },
            notes:{
              address:"Razorpay Corporate office"
            },
            theme: {
              color:"#3399cc"
            }
          };
          var pay = new window.Razorpay(options);
          pay.open();
    }    
    }

    return (
        <Fragment>
                <Badge badgeContent={cartItems.items.length} color="error">
                    <ShoppingCartIcon color="black" onClick={handleOpen} sx={{ width: '35px'}}/>
                </Badge>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                    <div className="cart__header">
                        <h2>Your Cart</h2>
                    </div>
                    <div className="cart__items__container">
                        <div className="cartItems">
                            {cartItems.items.length===0? 
                                <div className="cart__empty "> Empty cart!
                                <Button variant="outlined" className='ms-5' onClick={handleClose}>close</Button>
                                </div> : 
                                <div className="shop__cart__items">
                                    {cartItems.items.map((item) => <CartCard key={item._id} item={item}/>)}
                                </div>
                
                            }
                            {cartItems.items.length > 0 &&
                                <div className="options">
                                    <div className="total__amount">
                                        <div className="total__amount__label">Total Amount:</div>
                                        <div className="total__amount__value">Rs.{cartItems.totalAmount}.00</div>
                                    </div>
                                    <div className="checkout">
                                        <Button variant="outlined" className='me-5' onClick={handleaddressopen}>Checkout</Button>
                                        <Button variant="outlined" className='me-5' onClick={handleClose}>close</Button>
                                    </div>
                                </div>
                            }
                            </div>
                        </div>
                    </Box>
                </Modal>
                <Modal
                open={openCheckoutModal}
                onClose={handleCheckoutClose}
            >
                    <Box sx={style}>
                    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                        <h2>Your checkout was successful</h2>
                        <Button variant="outlined" onClick={handleCheckoutClose}>close</Button>
                    </div>
                    </Box>
                </Modal>
              
               <Modal open={address}
                    onClose={handleaddressclose}>
               
               
                 <Box sx={style}>
                 <form>
                    
                   <div className='form-group'>
                    
                        <h1 className='text-center'>Enter Delivery Address</h1>
                        <input className='form-control mb-3' name='Address' placeholder='Address' type='text'/>
                        <div class="form-row">
                                <div class="form-group col-md-6">
                                    <input name='Unit' placeholder='unit Number' className='form-control' type='text'/>
                                </div>
                                <div class="form-group col-md-6">
                                    <input name='City' placeholder='City' className='form-control' type='text'/>
                                </div>
                        </div>
                        <div class="form-row">
                                <div class="form-group col-md-6">
                                     <input name='State' placeholder='State' className='form-control' type='text'/>
                                </div>
                                <div class="form-group col-md-6">
                                     <input name='Postcode' placeholder='Postcode' className='form-control' type='number'/>
                                </div>
                        </div>
                        
                        <Button variant="outlined" className='me-5' onClick={handleCheckout}>Checkout</Button>
                        <Button variant="outlined" className='ms-5' onClick={handleaddressclose}>Close</Button>
                   </div>
                   </form>
                 </Box>
               </Modal>
        </Fragment>
     );
}
 
export default Cart;