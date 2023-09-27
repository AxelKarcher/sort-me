import './CreatePlaylistModal.scss'
import Modal from 'components/Modal/Modal'
import useAxios from 'hooks/useAxios'
import useAuth from 'hooks/useAuth'

const CreatePlaylistModal = ({isVisible, handleClose}) => {

  const {getUserInfos} = useAuth()

  console.log('getUserInfos:', getUserInfos)

  const {res: addRes, loading: addLoading, call: addCall} = useAxios({
    infos: {method: 'post', url: '/users/{user_id}/playlists'}
  })

  return (
    <Modal isVisible={isVisible} handleClose={handleClose} title='Créer une playlist'>
      <span>salut a tous</span>
    </Modal>
  )
}

export default CreatePlaylistModal