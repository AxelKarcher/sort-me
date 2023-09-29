import {useState, useEffect} from 'react'

import './HistoryAction.scss'
import addIcon from 'icons/add.svg'
import removeIcon from 'icons/remove.svg'
import Icon from 'components/Icon/Icon'
import cancelIcon from 'icons/cancel.svg'
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

  const [tmp, setTmp] = useState(false)

  useEffect(() => {if (tmp) {setTimeout(() => {setTmp(false)}, 1000)}}, [tmp])

  const {loading: addLoading, call: addCall} = useAxios({
    infos: {method: 'post', url: `/playlists/${playlistId}/tracks`},
    data: {uris: [trackUri]}
  })

  const {loading: removeLoading, call: removeCall} = useAxios({
    infos: {method: 'delete', url: `/playlists/${playlistId}/tracks`},
    data: {uris: [trackUri]}
  })

  const actionIsAdd = action === 'add'

  const isLoading = addLoading || removeLoading

  return (
    <div id='history-action-container'>
      {
        isLoading
        ?
        <Spinner />
        :
        <>
          {playlistImage && <img className='infos-img' src={playlistImage} alt='action-cover' />}
          <span>{playlistName}</span>
          <Icon
            icon={actionIsAdd ? addIcon : removeIcon}
            color={actionIsAdd ? 'green' : 'red'}
          />
          <img className='infos-img' src={albumImage} alt='album-cover' />
          <span>{trackName}</span>
          <Icon
            icon={cancelIcon}
            size={25}
            onClick={actionIsAdd ? removeCall : addCall}
          />
        </>
      }
    </div>
  )
}

export default HistoryAction