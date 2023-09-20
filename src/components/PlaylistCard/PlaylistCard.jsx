import {useState} from 'react'

import selectSvg from 'icons/select.svg'
import './PlaylistCard.scss'

const PlaylistCard = ({data, onClick, emptyLabel, fullWidth}) => {

  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={`
      playlist-card-container
      ${isHover && ' hover'}
      ${data === undefined && ' empty'}
      ${fullWidth && ' full-width'}
      `}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
      >
      {
        data
        ?
        <>
          <img className='album-cover' src={data?.images[0]?.url} alt='playlist cover' draggable='false' />
          <span className='text'>{data?.name}</span>
        </>
        :
        <>
          <img src={selectSvg} height={40} alt='add icon' />
          <span className='text empty-label'>{emptyLabel}</span>
        </>
      }
    </div>
  )
}

export default PlaylistCard