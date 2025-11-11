import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'
import { RecipePage } from './RecipePage.tsx'
import { LoginPage } from './LoginPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/:id" element={<RecipePage/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
