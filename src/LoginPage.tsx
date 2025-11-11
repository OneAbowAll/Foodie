import { useRef, useState } from "react";

export function LoginPage()
{
    const [debug, setDebug] = useState("");
    
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    return(
        <div className="container">
            <input type="text" ref={usernameInput} placeholder="Username"></input>
            <input type="password" ref={passwordInput} placeholder="Password"></input>
            <button>Login</button>
            <button>Logout</button>
        </div>
    );
}