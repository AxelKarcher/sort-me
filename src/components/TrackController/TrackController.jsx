import './TrackController.scss'
import AudioPlayer from 'components/AudioPlayer/AudioPlayer'

const TrackController = ({data, onPrevClick, onNextClick}) => {

  const {track: {
    name: trackName,
    preview_url: audio,
    album: {images},
    artists: [{name: artistName}]
  }} = data

  return (
    <div id='track-controller-container'>
      <div id='infos'>
        <img id='cover' src={images[0]?.url} alt='cover' />
        <span>{trackName}</span>
        <span id='artist-text'>{artistName}</span>
        <AudioPlayer autoPlay src={audio} onPrevClick={onPrevClick} onNextClick={onNextClick} />
      </div>
    </div>
  )
}

export default TrackController