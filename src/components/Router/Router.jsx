import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {createContext, useState} from 'react'

import AuthPage from 'pages/AuthPage/AuthPage'
import HomePage from 'pages/HomePage/HomePage'
import './Router.scss'

export const AppContext = createContext(null)

const Router = () => {

  const [token, setToken] = useState()

  return (
    <div id='router-container'>
      <BrowserRouter>
        <AppContext.Provider value={{token, setToken}}>
          <Routes>
            <Route path='/' element={<Navigate replace to='/auth' />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='*' element={<Navigate replace to='/auth' />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default Router