import { useContext, useRef } from "react";
import { FirebaseContext } from "../firebase/FirebaseContext";
import { AuthContext } from "../authentication/AuthContext";
import { signOut } from "firebase/auth";

export function Header({ onSearch, onSortChange } : { onSearch: (search: string) => void, onSortChange: (sortType: string)=>void })
{
  const firebase = useContext(FirebaseContext);
  const userSession = useContext(AuthContext);

  const searchInput = useRef<HTMLInputElement>(null);
  const sortSelect = useRef<HTMLSelectElement>(null);

  const handleSearch = () =>
  {
    onSearch(searchInput.current!.value.trim());
  };
  
  const handleSortChange = ()=>
  {
    onSortChange(sortSelect.current!.value);
  };

  const handleLogOut = ()=>
  {
    signOut(firebase.auth).then();
  }

  return (
    <div className="container header">
      <h2>Foodie</h2>

      <div>
        <input type="text" ref={searchInput} onChange={handleSearch} placeholder="Search recipe..."></input>
        <select name="sort" ref={sortSelect} onChange={handleSortChange}>
          <option value="latest">Latest</option>
          <option value="likes">Likes</option>
        </select>
      </div>

      <div>
        {userSession?.displayName}<span> | </span>
        {userSession?.email}
        <button onClick={handleLogOut} >Log Out</button>
      </div>
    </div>
  );
}