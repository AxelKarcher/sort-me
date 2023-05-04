import {useContext, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import {AppContext} from 'components/Router/Router'

const useAuth = () => {

  const navigate = useNavigate()

  const location = useLocation()

  const {token, setToken} = useContext(AppContext)

  useEffect(() => {
    if (!token) {setToken(localStorage.getItem('token'))}

    if (token) {
      localStorage.setItem('token', token)
      if (location.pathname === '/auth') {navigate('/home')}
    }
  }, [token])

  const handleDisconnect = () => {
    localStorage.removeItem('token')
    setToken(undefined)
  }

  return {token, setToken, handleDisconnect}
}

export default useAuth