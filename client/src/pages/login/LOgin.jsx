import "./Login.css";
import imageBg from "../../assets/image/imgbg2.jpg";
import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";



export default function LOgin() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"}); 
    try {
      const res = await axios.post("/server/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res.data);
      dispatch({type: "LOGIN_SUCCESS", payload: res.data}); 
    } catch (error) {
      dispatch({type: "LOGIN_FAILURE"}); 
    }
  };

  return (
    <div className="login" >
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
              type="text" 
              className="loginInput" 
              placeholder="Enter your username..." 
              ref={userRef}
            />

            <label>Password</label>
            <input 
              type="password" 
              className="loginInput" 
              placeholder="Enter your password..." 
              ref={passwordRef}
            />

            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </form> 
        <button className="loginRegister"> 
          <Link className="link" to="/register">Register</Link>
        </button>
    </div>
  )
}
