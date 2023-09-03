import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {createContext} from 'react'

import HomePage from 'pages/HomePage/HomePage'
import './Router.scss'

export const AppContext = createContext(null)

const Router = () => (
  <div id='router-container'>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Navigate replace to='/' />} /> */}
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </BrowserRouter>
  </div>
)

export default Router