import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
const userRef = useRef()
const passwordRef = useRef()
const {dispatch,isFetching} = useContext(Context)


  const handaleSubmit= async(e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try {
      const res = await axios.post("https://blogingnew.onrender.com/api/v1/login",{
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({type:"LOGIN_SUCCESS", payload:res.data})
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"})
    }
  }


  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handaleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
      <Link to='/register'>
      <button className="loginRegisterButton">Register</button>
      </Link>
      
    </div>
  );
}
