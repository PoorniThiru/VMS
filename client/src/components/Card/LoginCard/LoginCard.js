import { Link } from 'react-router-dom';
import './LoginCard.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {storeUserData} from '../../../components/services/Storage'
import {isAuthenticated} from '../../../components/services/Auth'
const LoginCard = () => {
    const initialStateErrors = {
        email:{required:false},
        password:{required:false},
        custom_error:null
    };

       


    const [errors,setErrors] = useState(initialStateErrors);
    const [email,setemail]=useState()
    const [password,setpassword]=useState()
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
       setErrors(initialStateErrors);
        e.preventDefault()
         axios.post("http://localhost:5000/login",{email,password})
        .then(result=>{console.log(result)
            if(result.data==="Password Incorrect"){
                setErrors({...errors,custom_error:"Password Incorrect."})
            }else if(result.data==="E-mail not registered"){
                setErrors({...errors,custom_error:"E-mail not registered."})
            }else{
               
                storeUserData(result.data);
                alert("Login Success")
                navigate("/")
                window.location.reload(false);
            }
        })
        .catch(err=>console.log(err))
    }

    return ( 
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="login__inputs">
                    <div className="email__input__container input__container">
                        <label className="email__label input__label">Email</label>
                        <input type="email" className="email__input login__input" placeholder='example@gmail.com'  onChange={(e)=>setemail(e.target.value)}  />
                        { errors.email.required?
                                (<span className="text-danger" >
                                    Email is required.
                                </span>):null
                                }
                    </div>
                    <div className="password__input__container input__container">
                        <label className="password__label input__label" >Password</label>
                        <input type="password" className="password__input login__input" placeholder='**********' onChange={(e)=>setpassword(e.target.value)}   />
                        { errors.password.required?
                                (<span className="text-danger" >
                                    Password is required.
                                </span>):null
                                }
                    </div>
                       
                    <span className="text-danger" >
                                { errors.custom_error?
                                (<p>{errors.custom_error}</p>)
                                :null
                                }
                                </span>

                    <div className="login__button__container">
                        <button type='submit' className="login__button" >LOGIN</button>
                    </div>
                </div>
                </form>
                <div className="login__other__actions">
                    <div className="login__forgot__password">Forgot password?</div>
                    <div className="login__new__account">Don't have account? <Link to="/account/register">Create account</Link> </div>
                </div>
            </div>
        </div>
     );
}
 
export default LoginCard;