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
import Icon from 'components/Icon/Icon'
import funnelIcon from 'icons/funnel.svg'
import useAuth from 'hooks/useAuth'

const HomePage = ({}) => {

  const [target, setTarget] = useState()
  const [targetChoiceModal, setTargetChoiceModal] = useState(false)
  const [currTrack, setCurrTrack] = useState(0)
  const [tracksCallInfos, setTracksCallInfos] = useState({limit: 20, offset: 0})

  const {disconnect, setUserInfos} = useAuth()

  const {res: userInfos, error: userInfosErr, loading: userInfosLoading, call: userInfosCall} = useAxios({
    infos: {method: 'get', url: '/me'},
  })

  const {res: playlists, loading: playlistsLoading, call: playlistsCall} = useAxios({
    infos: {method: 'get', url: `users/${userInfos?.id}/playlists`, dataPath: 'items'},
  })

  const {res: tracks, loading: tracksLoading, call: tracksCall} = useAxios({
    infos: {
      method: 'get',
      url: `/playlists/${target?.id}/tracks?limit=${tracksCallInfos?.limit}&offset=${tracksCallInfos?.offset}`
    },
  })

  // Starts with getting user infos
  useEffect(() => {userInfosCall()}, [])

  useEffect(() => {if (userInfosErr !== undefined) {disconnect()}}, [userInfosErr])

  // If user infos OK, get playlists
  useEffect(() => {
    if (userInfos === undefined) {return}

    setUserInfos(userInfos)
    playlistsCall()
  }, [userInfos])

  // If target selected, get some tracks
  useEffect(() => {
    if (target !== undefined) {
      // tracksCall()
      setTargetChoiceModal(false)
    }
  }, [target])

  // Reset curr track index if new data arrives
  useEffect(() => {if (tracks !== undefined) {setCurrTrack(0)}}, [tracks])

  const progress = `${tracksMock?.offset} - ${(tracksMock?.offset + tracksMock?.limit)} / ${tracksMock?.total}`

  return (
    <div id='home-page-container'>
      <Header userInfos={userInfos} />
      {/* Select the target */}
      <Modal
        title='Choisir la playlist à trier'
        isVisible={targetChoiceModal}
        handleClose={() => setTargetChoiceModal(false)}
      >
        <PlaylistPicker playlists={playlists} onPlaylistClick={(e) => setTarget(e)} />
      </Modal>
      <PlaylistsScroller
        playlists={playlists}
        trackUri={tracksMock?.items[currTrack]?.track?.uri}
      />
      <div id='sort-area'>
        {
          currTrack !== undefined &&
          <TrackController
            data={tracksMock?.items[currTrack]}
            onPrevClick={currTrack > 0 ? () => setCurrTrack((old) => old - 1) : null}
            onNextClick={
              currTrack < tracksMock?.items?.length - 1 ?
              () => setCurrTrack((old) => old + 1) :
              null
            }
          />
        }
        <div id='sort-card'>
          <PlaylistCard
            data={target}
            onClick={() => setTargetChoiceModal(true)}
            emptyLabel='Playlist à trier'
            icon={funnelIcon}
            isColored
          />
          <span id='data-control'>
            <Icon icon={leftSimpleArrow} size={20} />
            <span id='progress'>{progress}</span>
            <Icon className='right-arrow' icon={leftSimpleArrow} size={20} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default HomePage