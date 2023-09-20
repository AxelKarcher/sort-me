import logoutSvg from 'icons/logout.svg'

import './Header.scss'
import useAuth from 'hooks/useAuth'

const Header = ({userInfos}) => {

  const {disconnect} = useAuth()

  return (
    <div id='header-container'>
      <span>{userInfos?.display_name}</span>
      <img src={logoutSvg} height={40} alt='logout' onClick={disconnect} />
    </div>
  )
}

export default Header