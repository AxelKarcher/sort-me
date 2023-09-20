import './PlaylistPicker.scss'
import PlaylistCard from 'components/PlaylistCard/PlaylistCard'

const PlaylistPicker = ({playlists, onPlaylistClick}) => {
  return (
    <div id='playlist-picker-container'>
      {playlists?.map((playlist, i) => (
        <PlaylistCard
          key={i}
          data={playlist}
          onClick={() => onPlaylistClick(playlist)}
          fullWidth
        />
      ))}
    </div>
  )
}

export default PlaylistPicker