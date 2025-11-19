import './App.css'
import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { onAuthStateChanged, type User } from 'firebase/auth';

import { FirebaseContext } from './firebase/FirebaseContext';
import { LoginPage } from './authentication/LoginPage';
import { SignUp } from './authentication/SignUpPage';

import AppLayout from './AppLayout';
import { RecipePage } from './app/RecipePage';
import { RecipeBoard } from './app/RecipeBoard';
import { useLocalStorage } from './Hooks';
import { AuthContext } from './authentication/AuthContext';

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
  
  return (
    <AuthContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          { 
          user !== null?
          <Route element={<AppLayout/>}>
            <Route index path="/" element={<RecipeBoard/>}/>
            <Route index path="/:id" element={<RecipePage/>}/>
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
  )
}

export default App
