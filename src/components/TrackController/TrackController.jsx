import {useRef, useEffect} from 'react'

import './TrackController.scss'
import leftPlainArrow from 'icons/leftPlainArrow.svg'
import Icon from 'components/Icon/Icon'

const TrackController = ({data, onPrevClick, onNextClick}) => {

  const {track: {
    name: trackName,
    preview_url: audio,
    album: {name: albumName, images},
    artists: [{name: artistName}]
  }} = data

  const audioRef = useRef(null)

  useEffect(() => {audioRef.current.volume = 0.01}, [])

  return (
    <div id='track-controller-container'>
      <Icon
        className={`arrow ${!onPrevClick && 'disabled'}`}
        icon={leftPlainArrow}
        size={300}
        onClick={onPrevClick}
      />
      <div id='infos'>
        <img id='cover' src={images[0]?.url} alt='cover' />
        <span>{trackName}</span>
        <span id='artist-text'>{artistName}</span>
        <audio id='audio-player' controls autoPlay={true} src={audio} ref={audioRef} />
      </div>
      <Icon
        className={`arrow right-icon ${!onNextClick && 'disabled'}`}
        icon={leftPlainArrow}
        size={300}
        onClick={onNextClick}
      />
    </div>
  )
}

export default TrackController