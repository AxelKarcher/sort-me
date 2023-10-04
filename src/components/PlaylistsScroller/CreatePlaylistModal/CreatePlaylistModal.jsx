import {useState, useEffect} from 'react'

import './CreatePlaylistModal.scss'
import Modal from 'components/Modal/Modal'
import useAxios from 'hooks/useAxios'
import useAuth from 'hooks/useAuth'
import Spinner from 'components/Spinner/Spinner'
import Button from 'components/Button/Button'
import TextField from 'components/TextField/TextField'

const CreatePlaylistModal = ({isVisible, handleClose, onCreateSuccess}) => {

  const {getUserInfos} = useAuth()

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const {res: addRes, loading: addLoading, call: addCall} = useAxios({
    infos: {method: 'post', url: `/users/${getUserInfos()?.id}/playlists`},
    data: {name: name, description: desc}
  })

  useEffect(() => {if (addRes !== undefined) {
    onCreateSuccess()
    handleClose()
  }}, [addRes])

  return (
    <Modal
      className='create-playlist-modal-container'
      isVisible={isVisible}
      handleClose={handleClose}
      title='Créer une playlist'
    >
      <TextField label='Nom' value={name} setter={setName} />
      <TextField label='Description' value={desc} setter={setDesc} />
      {
        addLoading
        ?
        <Spinner />
        :
        <div className='bottom-btns'>
          <Button label='Annuler' onClick={handleClose} />
          <Button label='Confirmer' onClick={addCall} />
        </div>
      }
    </Modal>
  )
}

export default CreatePlaylistModal