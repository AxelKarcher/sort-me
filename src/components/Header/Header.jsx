import logoutSvg from 'icons/logout.svg'

import './Header.scss'
import useAuth from 'hooks/useAuth'
import Icon from 'components/Icon/Icon'

const Header = ({userInfos}) => {

  const {disconnect} = useAuth()

  return (
    <div id='header-container'>
      <span>{userInfos?.display_name}</span>
      <Icon icon={logoutSvg} onClick={disconnect} />
    </div>
  )
}

export default Header