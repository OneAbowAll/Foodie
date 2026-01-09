import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { FirebaseContext } from "../firebase/FirebaseContext";
import { useNavigate } from "react-router";
import { AnimateCSS } from "../Utilities";

import "animate.css";

export function LoginPage()
{
    const navigate = useNavigate();
    const firebase = useContext(FirebaseContext);
    const [error, setError] = useState("");
    
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const errorElement = useRef<HTMLParagraphElement>(null);

    const handleSignIn = ()=>
    {
        signInWithEmailAndPassword(
            firebase!.auth,
            emailInput.current!.value,
            passwordInput.current!.value
        )
        .then(()=>navigate("/"))
        .catch((error) => {
            AnimateCSS(errorElement.current!, "headShake");
            setError(error.message)
        });
    }

    return(
        <>
        <h1 className="text-outline">Foodie</h1>
        
        <div className="container auth-container">
            <input type="text" ref={emailInput} placeholder="Email"></input><br/>
            <input type="password" ref={passwordInput} placeholder="Password"></input><br/>
            <button onClick={handleSignIn}>Log In</button><br/>
            <p>Dont have an account? <a onClick={()=>navigate("/signup")}>Sign Up</a></p>
        </div>

        <div className="container auth-container" hidden={(error==="") ? true : false}>
            <p className="error" ref={errorElement}>
                {error}
            </p>
        </div>
        </>
    );
}