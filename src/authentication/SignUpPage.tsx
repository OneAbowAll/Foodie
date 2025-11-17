import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { FirebaseContext } from "../firebase/FirebaseContext";

export function SignUp()
{
    const firebase = useContext(FirebaseContext);
    const [debug, setDebug] = useState("");
    
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const handleSignIn = ()=>
    {
        signInWithEmailAndPassword(
            firebase!.auth,
            usernameInput.current!.value,
            passwordInput.current!.value
        ).then(
        (user)=>
        {
            setDebug(JSON.stringify(user));
        })
    }

    const handleSignOut = ()=>
    {
        signOut(
            firebase!.auth
        ).then();
    }

    return(
        <>
        <div className="container">
            <input type="text" ref={usernameInput} placeholder="Username"></input>
            <input type="password" ref={passwordInput} placeholder="Password"></input>
            <button onClick={handleSignIn}>Login</button>
            <button onClick={handleSignOut}>Logout</button>
        </div>
        <div className="container">
            <p>
                {debug}
            </p>
        </div>
        </>
    );
}