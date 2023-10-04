import {useState, useEffect} from 'react'

import selectIcon from 'icons/select.svg'
import './PlaylistCard.scss'
import closeIcon from 'icons/close.svg'
import useAxios from 'hooks/useAxios'
import Icon from 'components/Icon/Icon'
import Spinner from 'components/Spinner/Spinner'

const PlaylistCard = ({
  data, onClick, emptyLabel, icon, addToHistory,
  fullWidth, onClose, trackUri, isColored
}) => {

  const [isHover, setIsHover] = useState(false)

  const {res: addRes, loading: addLoading, call: addCall} = useAxios({
    infos: {method: 'post', url: `/playlists/${data?.id}/tracks`},
    data: {uris: [trackUri]}
  })

  // If added a song somewhere, trigger history push
  useEffect(() => {if (addRes !== undefined) {addToHistory(data)}}, [addRes])

  const handleOnClose = (e) => {
    onClose()

    // Prevents click on playlist under this one
    e.stopPropagation()
  }

  // Checks if image is invalid
  const isImageNull = data?.images?.[0]?.url === undefined

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
      onClick={trackUri ? addCall : onClick}
    >
      {
        data
        ?
        <>
          {
            data?.images?.[0]?.url &&
            <img
              className='album-cover'
              src={data?.images[0]?.url}
              alt='playlist cover'
              draggable='false'
            />
          }
          <span className={`text ${isImageNull && 'padding-left'}`}>{data?.name}</span>
          {
            addLoading
            ?
            <Spinner className='add-spinner' size='small' inverted />
            :
            onClose &&
            <Icon className='close-icon' onClick={handleOnClose} icon={closeIcon} />
          }
        </>
        :
        <>
          <img src={icon || selectIcon} height={40} alt='add icon' />
          {emptyLabel && <span className='text empty-label'>{emptyLabel}</span>}
        </>
      }
    </div>
  )
}

export default PlaylistCard