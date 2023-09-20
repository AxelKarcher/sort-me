import {useState} from 'react'

import './PlaylistsScroller.scss'
import PlaylistCard from 'components/PlaylistCard/PlaylistCard'
import PlaylistPicker from 'components/PlaylistPicker/PlaylistPicker'
import Modal from 'components/Modal/Modal'

const PlaylistsScroller = ({playlists, sorters, onPlaylistClick, onSorterClick}) => {

  const [sortersChoiceModal, setSortersChoiceModal] = useState(false)

  return (
    <div id='playlists-scroller-container'>
      {/* Select the sorters */}
      <Modal
        title='Choisir des possibilités'
        visible={sortersChoiceModal}
        handleClose={() => setSortersChoiceModal(false)}
      >
        <PlaylistPicker
          playlists={playlists}
          onPlaylistClick={(e) => onSorterClick(e)}
        />
      </Modal>
      <PlaylistCard
        onClick={() => setSortersChoiceModal(true)}
        emptyLabel='Possibilité'
        fitContent
      />
      {sorters?.map((playlist, i) => (
        <PlaylistCard
          key={i}
          data={playlist}
          onClick={() => onPlaylistClick(playlist)}
        />
      ))}
    </div>
  )
}

export default PlaylistsScroller