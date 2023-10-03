import {useEffect, useState} from 'react'

import './HomePage.scss'
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard'
import useAxios from 'hooks/useAxios'
import Header from 'components/Header/Header'
import Modal from 'components/Modal/Modal'
import PlaylistsScroller from 'components/PlaylistsScroller/PlaylistsScroller'
import PlaylistPicker from 'components/PlaylistPicker/PlaylistPicker'
import TrackController from 'components/TrackController/TrackController'
import leftSimpleArrow from 'icons/leftSimpleArrow.svg'
import Icon from 'components/Icon/Icon'
import funnelIcon from 'icons/funnel.svg'
import useAuth from 'hooks/useAuth'
import Spinner from 'components/Spinner/Spinner'
import historyIcon from 'icons/history.svg'
import HistoryModal from 'components/HistoryModal/HistoryModal'

const CALL_LIMIT = 50

const HomePage = ({}) => {

  const [target, setTarget] = useState()
  const [targetChoiceModal, setTargetChoiceModal] = useState(false)
  const [currTrackIdx, setCurrTrackIdx] = useState(0)
  const [callOffset, setCallOffset] = useState(0)
  const [historyModal, setHistoryModal] = useState(false)
  const [historyData, setHistoryData] = useState([])

  const {disconnect, setUserInfos} = useAuth()

  const {res: userInfos, error: userInfosErr, call: userInfosCall} = useAxios({
    infos: {method: 'get', url: '/me'},
  })

  const {res: playlists, loading: playlistsLoading, call: playlistsCall} = useAxios({
    infos: {method: 'get', url: `users/${userInfos?.id}/playlists`, dataPath: 'items'}
  })

  const {res: tracks, loading: tracksLoading, call: tracksCall} = useAxios({
    infos: {
      method: 'get',
      url: `/playlists/${target?.id}/tracks?limit=${CALL_LIMIT}&offset=${callOffset}`
    }
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

  useEffect(() => {if (target !== undefined) {tracksCall()}}, [callOffset])

  // If target selected, get some tracks
  useEffect(() => {
    if (target !== undefined) {
      tracksCall()
      setTargetChoiceModal(false)
    }
  }, [target])

  // Reset curr track index if new data arrives
  useEffect(() => {if (tracks !== undefined) {setCurrTrackIdx(0)}}, [tracks])

  const handlePrev = () => {setCallOffset((old) => old -= CALL_LIMIT)}

  const handleNext = () => {setCallOffset((old) => old += CALL_LIMIT)}

  const nextTrack = () => {setCurrTrackIdx((old) => old + 1)}

  const prevTrack = () => {setCurrTrackIdx((old) => old - 1)}

  const addToHistory = (playlist) => {
    setHistoryData((old) => [...old, {
      action: 'add',
      playlist: playlist,
      track: tracks?.items[currTrackIdx]?.track
    }])
  }

  const currTotal = tracks?.offset + tracks?.limit
  const currTotalDisplay = currTotal >= tracks?.total ? tracks?.total : currTotal
  const progress = `${tracks?.offset} - ${currTotalDisplay} / ${tracks?.total}`

  const isNoData = tracks === undefined

  const tracksAmount = tracks?.items?.length - 1

  return (
    <div id='home-page-container'>
    <Header />
      {/* Select the target */}
      <Modal
        title='Choisir la playlist à trier'
        isVisible={targetChoiceModal}
        handleClose={() => setTargetChoiceModal(false)}
      >
        <PlaylistPicker playlists={playlists} onPlaylistClick={(e) => setTarget(e)} />
      </Modal>
      <HistoryModal
        isVisible={historyModal}
        data={historyData}
        handleClose={() => setHistoryModal(false)}
      />
      {
        playlistsLoading
        ?
        <Spinner needMarginTop />
        :
        <PlaylistsScroller
          playlists={playlists}
          trackUri={tracks?.items[currTrackIdx]?.track?.uri}
          onCreateSuccess={playlistsCall}
          addToHistory={addToHistory}
        />
      }
      <div id='sort-area'>
        {
          (!isNoData && currTrackIdx !== undefined && tracks?.items?.length > 0) &&
          <TrackController
            data={tracks?.items[currTrackIdx]}
            onPrevClick={currTrackIdx > 0 ? prevTrack : null}
            onNextClick={currTrackIdx < tracksAmount ? nextTrack : null}
          />
        }
        <div id='sort-card'>
          {
            playlistsLoading || tracksLoading
            ?
            <Spinner />
            :
            <div className='target-row'>
              <PlaylistCard
                data={target}
                onClick={() => setTargetChoiceModal(true)}
                emptyLabel='Playlist à trier'
                icon={funnelIcon}
                isColored
              />
              {
                target &&
                <Icon
                  onClick={historyData?.length > 0 ? () => setHistoryModal(true) : null}
                  icon={historyIcon}
                />
              }
            </div>
          }
          {
            !isNoData &&
            <span id='data-control'>
              <Icon
                onClick={tracks?.previous ? handlePrev : null}
                icon={leftSimpleArrow}
                size={30}
              />
              <span id='progress'>{progress}</span>
              <Icon
                className='right-arrow'
                onClick={tracks?.next ? handleNext : null}
                icon={leftSimpleArrow}
                size={30}
              />
            </span>
          }
        </div>
      </div>
    </div>
  )
}

export default HomePage