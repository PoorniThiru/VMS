import './NavBrand.css'
import { Link } from 'react-router-dom';
import logo1Img from './logo1.png'

const NavBrand = () => {
    return ( 
        <div href="#home" className='navbrand__container'>
           <h1 className='navbrand'>
               <Link to="/" ><img src={logo1Img} style={{height:'75px', width:'200px' , objectFit:'cover',marginTop:'5%'}}/></Link>
            </h1>
        </div>
     );
}
    
export default NavBrand;