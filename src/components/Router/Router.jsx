import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import AuthPage from 'pages/AuthPage/AuthPage'
import HomePage from 'pages/HomePage/HomePage'
import {SpotifyProvider} from 'hooks/SpotifyContext'
import './Router.scss'

const Router = () => {
  return (
    <div id='router-container'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Navigate replace to='/auth' />} />
          <Route exact path='/auth' element={<AuthPage />} />
          <Route
            exact
            path='/home'
            element={
              <SpotifyProvider>
                <HomePage />
              </SpotifyProvider>
            }
          />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router