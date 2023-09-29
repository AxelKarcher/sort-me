import {useState, useEffect} from 'react'

import './PlaylistsScroller.scss'
import PlaylistCard from 'components/PlaylistCard/PlaylistCard'
import PlaylistPicker from 'components/PlaylistPicker/PlaylistPicker'
import Modal from 'components/Modal/Modal'
import CreatePlaylistModal from './CreatePlaylistModal/CreatePlaylistModal'

const PlaylistsScroller = ({
  playlists, trackUri,
  onCreateSuccess, addToHistory
}) => {

  const [createPlaylistModal, setCreatePlaylistModal] = useState(false)
  const [sortersChoiceModal, setSortersChoiceModal] = useState(false)
  const [sorters, setSorters] = useState([])

  // Add sorter to selection
  const addSorter = (playlist) => {setSorters((old) => [...old, playlist])}

  // Remove sorter playlist from selection
  const unselectSorter = (idx) => {
    setSorters((old) => old.filter((_sorter, i) => {return i !== idx}))
  }

  // Makes sure sorters in selection are all unique
  const possibleSorters = playlists?.filter((playlist) => {
    return !sorters.some((sorter) => sorter?.id === playlist?.id)
  })

  // If no more possible sorters, close modal
  useEffect(() => {
    if (possibleSorters?.length === 0) {setSortersChoiceModal(false)}
  }, [possibleSorters])

  return (
    <div id='playlists-scroller-container'>
      {/* Select the sorters */}
      <Modal
        title='Ajouter des possibilités'
        isVisible={sortersChoiceModal}
        handleClose={() => setSortersChoiceModal(false)}
      >
        <PlaylistPicker playlists={possibleSorters} onPlaylistClick={(e) => addSorter(e)} />
      </Modal>
      {/* Create playlist modal */}
      <CreatePlaylistModal
        isVisible={createPlaylistModal}
        handleClose={() => setCreatePlaylistModal(false)}
        onCreateSuccess={onCreateSuccess}
      />
      {/* Playlist card for adding sorters */}
      <>
        {
          possibleSorters?.length > 0 &&
          <PlaylistCard onClick={() => setSortersChoiceModal(true)} emptyLabel='Possibilité' />
        }
      </>
      {sorters?.map((playlist, i) => (
        <PlaylistCard
          key={i}
          data={playlist}
          onClose={() => unselectSorter(i)}
          trackUri={trackUri}
          addToHistory={addToHistory}
        />
      ))}
      {/* Create playlist card */}
      <PlaylistCard
        onClick={() => setCreatePlaylistModal(true)}
        emptyLabel='Créer une playlist'
      />
    </div>
  )
}

export default PlaylistsScroller