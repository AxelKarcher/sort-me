import './TrackController.scss'
import leftPlainArrow from 'icons/leftPlainArrow.svg'

const TrackController = ({data, handleArrowClick}) => {

  const {track: {
    name: trackName,
    preview_url: audio,
    album: {name: albumName, images},
    artists: [{name: artistName}]
  }} = data

  return (
    <div id='track-controller-container'>
      <img
        className='arrow'
        src={leftPlainArrow}
        alt='left'
        onClick={() => handleArrowClick('prev')}
      />
      <div id='infos'>
        <img id='cover' src={images[0]?.url} alt='cover' />
        <span>{trackName}</span>
        <span id='artist-text'>{artistName}</span>
        <audio id='audio-player' controls autoPlay={true} src={audio} />
      </div>
      <img
        className='arrow right-icon'
        src={leftPlainArrow}
        alt='right'
        onClick={() => handleArrowClick('next')}
      />
    </div>
  )
}

export default TrackController