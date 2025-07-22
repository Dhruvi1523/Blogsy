import "./navbar.css";
import { logo } from "../../assets/index";
// import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { GrClose } from "react-icons/gr";
import { FiAlignJustify } from "react-icons/fi";
import {useState} from "react";


export default function NavBar() {
  const {user, dispatch} = useContext(Context);
  const PF = "https://blogsy-jb29.onrender.com/images/"

  const handleLogout = () => {
    dispatch({type: "LOGOUT"});
  }


  /*=============== Toggle Menu ===============*/
  const[isMobile, setIsMobile] = useState(false);


  return (

    <nav className='navbar'>
      <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>

      <ul className={isMobile ? "nav-links-mobile" : "nav-link"}
         onClick={() => setIsMobile(false)}
      >
        <Link to="/" className="nav_home"><li>Home</li></Link>
        <Link to="/explore" className="nav_explore"><li>Explore</li></Link>
        <Link to="/about" className="nav_about"><li>About</li></Link>
        <Link to="/contact" className="nav_contact"><li>Contact</li></Link>
        <Link to="/write" className="nav_write"><li>Post</li></Link>

        <Link><li className="nav_logout" onClick={handleLogout}>{user && "Logout"}</li></Link>
      </ul>

      <div>
        {user ? (
          <Link to="/settings">
            <img 
              className="dp" 
              src={PF + user.profilePic} 
              alt=" "
            />
          </Link>
          ) : (
          <ul className="loginBar">
            <li><Link className="link" id="loginBar" to="/login">Login</Link></li>
            <li><Link className="link" id="loginBar" to="/register">Register</Link></li>
          </ul>
          )
        }
      </div>
      

      <div className='mobile-menu-icon'
         onClick={() => setIsMobile(!isMobile)}
      >
         {isMobile ? (
            <i className='icon'><GrClose /></i>
         ) : (
            <i className="icon"><FiAlignJustify /></i>
         )}
      </div>
    </nav>


















    
  )
}