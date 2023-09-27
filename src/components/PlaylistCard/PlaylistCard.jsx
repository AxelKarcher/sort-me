import {useState} from 'react'

import selectSvg from 'icons/select.svg'
import './PlaylistCard.scss'
import closeSvg from 'icons/close.svg'
import useAxios from 'hooks/useAxios'
import Icon from 'components/Icon/Icon'
import Spinner from 'components/Spinner/Spinner'

const PlaylistCard = ({
  data, onClick, emptyLabel, icon,
  fullWidth, onClose, trackUri, isColored
}) => {

  const [isHover, setIsHover] = useState(false)

  const [addLoading, setAddLoading] = useState(false) // tmp

  // const {res: addRes, loading: addLoading, call: addCall} = useAxios({
  const {res: addRes, loading, call: addCall} = useAxios({
    infos: {method: 'post', url: `/playlists/${data?.id}/tracks`},
    data: {uris: [trackUri]},
    debug: true
  })

  // tmp
  const tmp = () => {
    setAddLoading(true)
    setTimeout(() => {
      setAddLoading(false)
    }, 1000)
  }

  const handleOnClose = (e) => {
    onClose()
    e.stopPropagation()
  }

  // Checks if image is undefined or invalid
  const isImageNull = data?.images[0]?.url === undefined

  return (
    <div
      className={`
        playlist-card-container
        ${data === undefined && ' empty'}
        ${(isHover || isColored) && ' colored'}
        ${fullWidth && ' full-width'}
      `}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={trackUri ? tmp : onClick} // replace tmp par addCall
    >
      {
        data ?
        <>
          {
            <>
              {
                data?.images[0]?.url &&
                <img
                  className='album-cover'
                  src={data?.images[0]?.url}
                  alt='playlist cover'
                  draggable='false'
                />
              }
              {
                addLoading ?
                <Spinner /> :
                <span className={`text ${isImageNull && 'padding-left'}`}>{data?.name}</span>
              }
              {
                !addLoading && onClose &&
                <Icon className='close-icon' onClick={handleOnClose} icon={closeSvg} />
              }
            </>
          }
        </> :
        <>
          <img src={icon || selectSvg} height={40} alt='add icon' />
          {
            emptyLabel &&
            <span className='text empty-label'>{emptyLabel}</span>
          }
        </>
      }
    </div>
  )
}

export default PlaylistCard