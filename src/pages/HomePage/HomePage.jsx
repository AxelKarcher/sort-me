import {useEffect, useState} from 'react'

import './HomePage.scss'
import PlaylistCard from './PlaylistCard/PlaylistCard'
import useAxios from 'hooks/useAxios'
import Header from 'components/Header/Header'
import Modal from 'components/Modal/Modal'
import Button from 'components/Button/Button'

const HomePage = ({}) => {

  const [playlistModalInfos, setPlaylistModalInfos] = useState()
  const [playlistSetup, setPlaylistSetup] = useState({target: undefined, sorters: []})
  const [resetModal, setResetModal] = useState(false)

  const {res: userInfos, loading: userInfosLoading, call: userInfosCall} = useAxios({
    infos: {method: 'get', url: 'me'},
  })

  const {res: playlists, loading: playlistsLoading, call: playlistsCall} = useAxios({
    infos: {method: 'get', url: `users/${userInfos?.id}/playlists`, dataPath: 'items'},
  })

  // Starts with getting user infos
  useEffect(() => {userInfosCall()}, [])

  // If user infos OK, get playlists
  useEffect(() => {
    if (userInfos === undefined) {return}

    localStorage.setItem('userInfos', JSON.stringify(userInfos))
    playlistsCall()
  }, [userInfos])

  const editPlaylistSetup = (action) => {
    if (action === 'target') {
      setPlaylistSetup((old) => ({...old, target: playlistModalInfos}))
    } else {
      setPlaylistSetup((old) => ({
        ...old,
        sorters: [...old?.sorters, playlistModalInfos]
      }))
    }
    setPlaylistModalInfos(undefined)
  }

  console.log('playlistSetup:', playlistSetup)

  const upperPlaylists = playlists?.filter((playlist) => {
    return playlist?.id !== playlistSetup?.target?.id
  })

  return (
    <div id='home-page-container'>
      <Header />
      {/* Target or sort the selected playlist */}
      <Modal
        title={playlistModalInfos?.name}
        visible={playlistModalInfos !== undefined}
        handleClose={() => setPlaylistModalInfos(undefined)}
      >
        <span>Que souhaites-tu en faire ?</span>
        <div id='playlist-modal-btns'>
          <Button label='Trier' onClick={() => editPlaylistSetup('target')} />
          <Button label='Compléter' onClick={() => editPlaylistSetup('sorters')} />
        </div>
      </Modal>
      <Modal
        title=''
        visible={resetModal}
        handleClose={() => setResetModal(false)}
      >

      </Modal>
      <div id='playlists'>
        {upperPlaylists?.map((playlist, i) => (
          <PlaylistCard
            key={i}
            data={playlist}
            onClick={() => setPlaylistModalInfos(playlist)}
          />
        ))}
      </div>
      {
        playlistSetup?.target !== undefined &&
        <div>
          <span>Playlist à trier</span>
          <PlaylistCard
            data={playlistSetup?.target}
            onClick={() => setResetModal(true)}
          />
        </div>
      }
    </div>
  )
}

export default HomePage