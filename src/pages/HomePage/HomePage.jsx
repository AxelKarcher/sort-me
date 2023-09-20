import {useEffect, useState} from 'react'

import './HomePage.scss'
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard'
import useAxios from 'hooks/useAxios'
import Header from 'components/Header/Header'
import Modal from 'components/Modal/Modal'
import PlaylistsScroller from 'components/PlaylistsScroller/PlaylistsScroller'
import PlaylistPicker from 'components/PlaylistPicker/PlaylistPicker'
import TrackController from 'components/TrackController/TrackController'
import tracksMock from 'config/tracks'
import leftSimpleArrow from 'icons/leftSimpleArrow.svg'

const HomePage = ({}) => {

  const [currSetup, setCurrSetup] = useState({target: undefined, sorters: []})
  const [targetChoiceModal, setTargetChoiceModal] = useState(false)
  const [currTrack, setCurrTrack] = useState(0)
  const [playlistToAdd, setPlaylistToAdd] = useState()

  const {res: userInfos, error: userInfosErr, loading: userInfosLoading, call: userInfosCall} = useAxios({
    infos: {method: 'get', url: '/me'},
  })

  const {res: playlists, loading: playlistsLoading, call: playlistsCall} = useAxios({
    infos: {method: 'get', url: `users/${userInfos?.id}/playlists`, dataPath: 'items'},
  })

  const {res: tracks, loading: tracksLoading, call: tracksCall} = useAxios({
    infos: {
      method: 'get',
      url: `/playlists/${currSetup?.target?.id}/tracks?limit=20&offset=0`
    },
  })

  const {res: addRes, loading: addLoading, call: addCall} = useAxios({
    infos: {
      method: 'post',
      url: `/playlists/${playlistToAdd?.id}/tracks`
    },
    data: {
      uris: `spotify:track:${tracksMock?.items[currTrack]?.track?.id}`
    },
    debug: true
  })

  // Starts with getting user infos
  useEffect(() => {userInfosCall()}, [])

  useEffect(() => {
    if (userInfosErr !== undefined) {
      localStorage.removeItem('userToken')
      window.location.href = '/auth'
    }
  }, [userInfosErr])

  // If user infos OK, get playlists
  useEffect(() => {
    if (userInfos === undefined) {return}

    localStorage.setItem('userInfos', JSON.stringify(userInfos))
    playlistsCall()
  }, [userInfos])

  // If target selected, get some tracks
  // useEffect(() => {if (currSetup?.target !== undefined) {tracksCall()}}, [currSetup])

  // Reset curr track index if new data arrives
  useEffect(() => {if (tracks !== undefined) {setCurrTrack(0)}}, [tracks])

  useEffect(() => {
    if (playlistToAdd !== undefined) {
      addCall()
      setPlaylistToAdd(undefined)
    }
  }, [playlistToAdd])

  const editCurrSetup = (action, data) => {
    if (action === 'target') {
      setCurrSetup((old) => ({...old, target: data}))
      setTargetChoiceModal(false)
    } else {
      setCurrSetup((old) => ({...old, sorters: [...old?.sorters, data]}))
    }
  }

  const handleEditCurrTrack = (action) => {
    if (action === 'prev' && currTrack > 0) {
      setCurrTrack((old) => old - 1)
    } else if (action === 'next' && currTrack < tracksMock?.items?.length - 1) {
      setCurrTrack((old) => old + 1)
    }
  }

  const progress = `${tracksMock?.offset} - ${(tracksMock?.offset + tracksMock?.limit)} / ${tracksMock?.total}`

  return (
    <div id='home-page-container'>
      <Header userInfos={userInfos} />
      {/* Select the target */}
      <Modal
        title='Choisir la playlist à trier'
        visible={targetChoiceModal}
        handleClose={() => setTargetChoiceModal(false)}
      >
        <PlaylistPicker
          playlists={playlists}
          onPlaylistClick={(e) => editCurrSetup('target', e)}
        />
      </Modal>
      <PlaylistsScroller
        playlists={playlists}
        sorters={currSetup?.sorters}
        onPlaylistClick={(e) => setPlaylistToAdd(e)}
        onSorterClick={(e) => editCurrSetup('sorter', e)}
      />
      <div id='sort-area'>
        {
          currTrack !== undefined &&
          <TrackController
            data={tracksMock?.items[currTrack]}
            handleArrowClick={handleEditCurrTrack}
          />
          }
        <div id='sort-card'>
          <PlaylistCard
            data={currSetup?.target}
            onClick={() => setTargetChoiceModal(true)}
            emptyLabel='Trier'
          />
          <span id='data-control'>
            <img src={leftSimpleArrow} height={20} alt='left' />
            <span id='progress'>{progress}</span>
            <img id='right-arrow' src={leftSimpleArrow} height={20} alt='right' />
          </span>
        </div>
      </div>
    </div>
  )
}

export default HomePage