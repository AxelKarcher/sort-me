import {useState} from 'react'

import './PlaylistCard.scss'

const PlaylistCard = ({data, onClick}) => {

  const {external_urls, description, id, images, name} = data

  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={`playlist-card-container ${isHover && 'hover'}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
    >
      <img src={images[0]?.url} alt='playlist-cover' draggable='false' />
      <span className='name'>{name}</span>
    </div>
  )
}

export default PlaylistCard