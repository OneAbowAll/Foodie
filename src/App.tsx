import './App.css'
import './Recipes.css'
import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { onAuthStateChanged, type User } from 'firebase/auth';

import { FirebaseContext } from './firebase/FirebaseContext';
import { LoginPage } from './authentication/LoginPage';
import { SignUp } from './authentication/SignUpPage';

import AppLayout from './AppLayout';
import { RecipePage } from './app/RecipePage';
import { RecipeBoard } from './app/RecipeBoard';
import { AuthContext } from './authentication/AuthContext';
import { RecipeCreate } from './app/RecipeCreate';
import { ProfilePage } from './app/ProfilePage';
import { useLocalStorage, useOnlineStatus } from './Hooks';
import { OfflinePage } from './OfflinePage';
import { RecipeEdit } from './app/RecipeEdit';

function App() {

  const firebase = useContext(FirebaseContext);

  //User session
  const [user, setUser] = useLocalStorage<User | null>("user" , null);
  onAuthStateChanged(
    firebase.auth,
    (u)=>{
      setUser(u);
    }
  );

  const isOnline = useOnlineStatus();
  
  return (
    <AuthContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          {
          !isOnline 
          ? <Route><Route path='*' element={<OfflinePage/>}/></Route> 
          : user !== null?
            <Route element={<AppLayout/>}>
              <Route index path="/" element={<RecipeBoard/>}/>
              <Route index path="/:id" element={<RecipePage/>}/>
              <Route index path="/create" element={<RecipeCreate/>}/>
              <Route index path="/edit/:id" element={<RecipeEdit/>}/>
              <Route index path="/account" element={<ProfilePage/>}/>
            </Route>
            :
            <Route>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/signup" element={<SignUp/>} />
            </Route>
          }
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App
