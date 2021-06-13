import {React, useRef} from "react";
import "./signUpScreen.css";
import {auth} from "../firebase";

function SignUpScreen() {

  const emailRef = useRef(null);
  const passwordRef=useRef(null);

  const register = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
      ).then(authUser=>{
        console.log(authUser);
      }).catch(error=>{
        alert("please try again later");
      })
  };

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
      ).then(login=>{
        console.log("login Successfull");
      }).catch(error=>{
        alert("login failed");
      })

  };

  return (
    <div className="signUpScreen">
      <form action="">
        <h1>Sign Up</h1>
        <input type="email" placeholder="Email" ref={emailRef}/>
        <input type="password" placeholder="Password" ref={passwordRef}/>
        <button onClick={signIn}
        type="submit">Sign In</button>

        <h4>
          <span className="signUpScreen_gray">New to Netflix ?</span>
          <span onClick={register}
          className="signUpScreen_whiteLink">
            Sign Up Now.</span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
