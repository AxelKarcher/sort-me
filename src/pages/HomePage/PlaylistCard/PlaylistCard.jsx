import {useState} from 'react'

import './PlaylistCard.scss'
import infoSvg from 'icons/info.svg'
import Icon from 'components/Icon/Icon'

const PlaylistCard = ({data}) => {

  const {external_urls, _description, _id, images, name} = data

  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={`playlist-card-container ${isHover && 'hover'}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className='texts'>
        <span className='name'>{name}</span>
      </div>
      <Icon
        icon={infoSvg}
        onClick={window.open(external_urls?.spotify , '_blank')}
        className='info-icon'
      />
      <img src={images[0]?.url} alt='playlist-cover' />
    </div>
  )
}

export default PlaylistCard