import logoutIcon from 'icons/logout.svg'

import './Header.scss'
import useAuth from 'hooks/useAuth'
import Icon from 'components/Icon/Icon'

const Header = ({}) => {

  const {disconnect, getUserInfos} = useAuth()

  const display_name = getUserInfos()?.display_name

  return (
    <div id='header-container'>
      <span>{display_name}</span>
      <Icon icon={logoutIcon} onClick={disconnect} />
    </div>
  )
}

export default Header