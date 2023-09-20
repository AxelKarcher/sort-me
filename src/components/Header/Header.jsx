import logoutSvg from 'icons/logout.svg'

import './Header.scss'
import Icon from 'components/Icon/Icon'

const Header = ({}) => {

  const {display_name} = JSON.parse(localStorage.getItem('userInfos'))

  const handleDisconnect = () => {
    localStorage.removeItem('userToken')
    window.location.href = '/auth'
  }

  return (
    <div id='header-container'>
      <span>{display_name}</span>
      <Icon
        icon={logoutSvg}
        onClick={handleDisconnect}
      />
    </div>
  )
}

export default Header