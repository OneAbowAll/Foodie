import { Outlet } from "react-router";


export default function AppLayout()
{
    //In teoria questa cosa non mi serve piu', pero' la lascio nel caso debba mettere qualche Context.
    return (
    <Outlet/>
    );
}