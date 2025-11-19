import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { FirebaseContext } from "../firebase/FirebaseContext";
import { useNavigate } from "react-router";
import { AnimateCSS } from "../Utilities";

import "animate.css";

export function SignUp()
{
    const navigate = useNavigate();
    const firebase = useContext(FirebaseContext);
    const [error, setError] = useState("");
        
    const usernameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const errorElement = useRef<HTMLParagraphElement>(null);

    const handleSignIn = ()=>
    {
        const username = usernameInput.current!.value;
        if(username.trim() === "" || username.length < 6)
        {
            AnimateCSS(errorElement.current!, "headShake");
            setError("Provided username is not valid, must be at least 6 chars.");
            return;
        }

        createUserWithEmailAndPassword(
            firebase!.auth,
            emailInput.current!.value,
            passwordInput.current!.value
        )
        .then((userData) =>{
            updateProfile(
                userData.user, 
                {displayName: usernameInput.current!.value}
            )
            .then(() => navigate("/"));
        })
        .catch((error) => {
            AnimateCSS(errorElement.current!, "headShake");
            setError(error.message)
        });
    }

    return(
        <>
        <h1 className="text-outline">Foodie</h1>
        <div className="container auth-container">
            <input type="text" ref={usernameInput} placeholder="Username"></input><br/>
            <input type="text" ref={emailInput} placeholder="Email"></input><br/>
            <input type="password" ref={passwordInput} placeholder="Password"></input><br/>
            <button onClick={handleSignIn}>Sign Up</button><br/>
            <p>Already have an account? <a onClick={()=>navigate("/login")}>Log In</a></p>
        </div>
        <div className="container auth-container" hidden={(error==="") ? true : false}>
            <p className="error" ref={errorElement}>
                {error}
            </p>
        </div>
        </>
    );
}