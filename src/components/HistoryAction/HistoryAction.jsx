import {useState, useEffect} from 'react'

import './HistoryAction.scss'
import addIcon from 'icons/add.svg'
import removeIcon from 'icons/remove.svg'
import Icon from 'components/Icon/Icon'
import cancelIcon from 'icons/cancel.svg'
import restartIcon from 'icons/restart.svg'
import useAxios from 'hooks/useAxios'
import Spinner from 'components/Spinner/Spinner'

const HistoryAction = ({data}) => {

  const {
    action: action,
    playlist: {
      name: playlistName,
      id: playlistId,
      images: playlistImages
    },
    track: {
      name: trackName,
      uri: trackUri,
      album: {images: albumImages}
    }
  } = data

  const playlistImage = playlistImages[0]?.url
  const albumImage = albumImages[0]?.url

  const [isReverted, setIsReverted] = useState(false)

  const {res: addRes, loading: addLoading, call: addCall} = useAxios({
    infos: {method: 'post', url: `/playlists/${playlistId}/tracks`},
    data: {uris: [trackUri]}
  })

  const {res: removeRes, loading: removeLoading, call: removeCall} = useAxios({
    infos: {method: 'delete', url: `/playlists/${playlistId}/tracks`},
    data: {uris: [trackUri]}
  })

  useEffect(() => {
    if (addRes !== undefined || removeRes !== undefined) {setIsReverted(true)}
  }, [addRes, removeRes])

  const actionIsAdd = action === 'add'

  const isLoading = addLoading || removeLoading

  return (
    <div id='history-action-container'>
      {playlistImage && <img className='infos-img' src={playlistImage} alt='action-cover' />}
      <span>{playlistName}</span>
      <Icon
        icon={actionIsAdd ? addIcon : removeIcon}
        color={actionIsAdd ? 'green' : 'red'}
      />
      <img className='infos-img' src={albumImage} alt='album-cover' />
      <span>{trackName}</span>
      <div className='status-area'>
        {
          isLoading
          ?
          <Spinner inverted size='small' />
          :
          <Icon
            icon={isReverted ? restartIcon : cancelIcon}
            size={25}
            onClick={isReverted ? null : (actionIsAdd ? removeCall : addCall)}
          />
        }
      </div>
    </div>
  )
}

export default HistoryAction