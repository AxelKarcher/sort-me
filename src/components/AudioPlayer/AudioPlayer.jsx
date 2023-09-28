import {useEffect, useRef, useState} from 'react'

import pauseIcon from 'icons/pause.svg'
import playIcon from 'icons/play.svg'
import volumeMaxIcon from 'icons/volumeMax.svg'
import volumeMuteIcon from 'icons/volumeMute.svg'
import restartIcon from 'icons/restart.svg'
import previousIcon from 'icons/previous.svg'
import Icon from 'components/Icon/Icon'
import './AudioPlayer.scss'

const DEFAULT_VOLUME = 0.15

const AudioPlayer = ({src, autoPlay = false, onPrevClick, onNextClick}) => {

  const [isOnPause, setIsOnPause] = useState(true)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [isMuted, setIsMuted] = useState(false)

  const ref = useRef(null)

  useEffect(() => {ref.current.volume = DEFAULT_VOLUME}, [])

  useEffect(() => {ref.current.volume = isMuted ? 0 : volume}, [isMuted])

  const handlePlay = () => {
    ref?.current?.play()
    setIsOnPause(false)
  }

  const handlePause = () => {
    ref?.current?.pause()
    setIsOnPause(true)
  }

  const handleRestart = () => {
    ref.current.currentTime = 0
    handlePlay()
  }

  const toggleMute = () => {setIsMuted((old) => !old)}

  return (
    <div id='audio-player-container'>
      {/* Hidden default audio tag */}
      <audio
        id='audio-tag'
        autoPlay={autoPlay}
        src={src}
        ref={ref}
        onPlay={handlePlay}
        onEnded={handlePause}
      />
      <Icon onClick={onPrevClick} icon={previousIcon} />
      <Icon onClick={onNextClick} className='next-icon' icon={previousIcon} />
      <Icon
        icon={isOnPause ? playIcon : pauseIcon}
        onClick={isOnPause ? handlePlay : handlePause}
      />
      <Icon onClick={handleRestart} icon={restartIcon} />
      <Icon onClick={toggleMute} icon={isMuted ? volumeMuteIcon : volumeMaxIcon} />
    </div>
  )
}

export default AudioPlayer