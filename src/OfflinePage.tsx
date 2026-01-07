import { useEffect } from "react";
import { useOnlineStatus } from "./Hooks";
import { useNavigate } from "react-router";

export function OfflinePage()
{
    const navigate = useNavigate();
    const isOnline = useOnlineStatus();
    useEffect(()=>{
        if(isOnline)
            navigate('/');
    }, [isOnline, navigate]);
    
    return(
        <>
        <h1 className="text-outline">Foodie</h1>
        <div className="container ">
            <h1>Sei Offline!</h1>
            <p>Per poter usare correttamente Foodie serve una connessione internt.</p>
        </div>
        </>
    );
}