import {useEffect, useRef, useState} from 'react'

import pauseIcon from 'icons/pause.svg'
import playIcon from 'icons/play.svg'
import volumeMaxIcon from 'icons/volumeMax.svg'
import volumeMuteIcon from 'icons/volumeMute.svg'
import restartIcon from 'icons/restart.svg'
import previousIcon from 'icons/previous.svg'
import addIcon from 'icons/add.svg'
import removeIcon from 'icons/remove.svg'
import Icon from 'components/Icon/Icon'
import Tooltip from 'components/Tooltip/Tooltip'
import './AudioPlayer.scss'

const DEFAULT_VOLUME = 0.2

const AudioPlayer = ({src, autoPlay = false, onPrevClick, onNextClick}) => {

  const [isOnPause, setIsOnPause] = useState(true)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [isMuted, setIsMuted] = useState(false)
  const [volumeTooltip, setVolumeTooltip] = useState(false)

  const ref = useRef(null)

  useEffect(() => {ref.current.volume = DEFAULT_VOLUME}, [])

  useEffect(() => {ref.current.volume = isMuted ? 0 : volume}, [isMuted])

  useEffect(() => {
    setIsMuted(volume === 0)
    ref.current.volume = volume
  }, [volume])

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

  const handleVolumeUp = () => {setVolume((old) => parseFloat((old += 0.1).toFixed(1)))}

  const handleVolumeDown = () => {setVolume((old) => parseFloat((old -= 0.1).toFixed(1)))}

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
      <div style={{position: 'relative'}}>
        <Tooltip
          isVisible={volumeTooltip}
          handleClose={() => setVolumeTooltip(false)}
        >
          <Icon size={30} onClick={volume === 1 ? null : handleVolumeUp} icon={addIcon} />
          <Icon size={30} onClick={isMuted ? null : handleVolumeDown} icon={removeIcon} />
        </Tooltip>
        <Icon
          onClick={toggleMute}
          icon={isMuted ? volumeMuteIcon : volumeMaxIcon}
          onMouseEnter={() => setVolumeTooltip(true)}
        />
      </div>
    </div>
  )
}

export default AudioPlayer