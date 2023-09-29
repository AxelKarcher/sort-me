import './HistoryModal.scss'
import Modal from 'components/Modal/Modal'
import HistoryAction from 'components/HistoryAction/HistoryAction'

const dataMock = [
  {
    "action": "add",
    "playlist": {
      "images": [
        {"url": "https://i.scdn.co/image/ab67616d0000b2739b92f2258a749122ae313ee5",}
      ],
      "name": "test",
      "uri": "spotify:playlist:1g66hsAUOvsX3hjVl4CoTr"
    },
    "track": {
      "album": {
        "artists": [{"name": "The Blue Stones",}],
        "images": [
          {"url": "https://i.scdn.co/image/ab67616d0000b2739b92f2258a749122ae313ee5",},
        ],
        "name": "Be My Fire",
      },
      "artists": [
          {
              "name": "The Blue Stones",
          }
      ],
      "id": "2qAgVp8OvDFJ1zJqFdbuYV",
      "name": "Be My Fire",
      "uri": "spotify:track:2qAgVp8OvDFJ1zJqFdbuYV"
    }
  },
  {
    "action": "remove",
    "playlist": {
      "images": [
        {"url": "https://i.scdn.co/image/ab67616d0000b2739b92f2258a749122ae313ee5",}
      ],
      "name": "test",
      "uri": "spotify:playlist:1g66hsAUOvsX3hjVl4CoTr"
    },
    "track": {
      "album": {
        "artists": [{"name": "The Blue Stones",}],
        "images": [
          {"url": "https://i.scdn.co/image/ab67616d0000b2739b92f2258a749122ae313ee5",},
        ],
        "name": "Be My Fire",
      },
      "artists": [
          {
              "name": "The Blue Stones",
          }
      ],
      "id": "2qAgVp8OvDFJ1zJqFdbuYV",
      "name": "Be My Fire",
      "uri": "spotify:track:2qAgVp8OvDFJ1zJqFdbuYV"
    }
  },
]

const HistoryModal = ({isVisible, handleClose, data}) => {
  return (
    <Modal isVisible={isVisible} handleClose={handleClose} title='Historique'>
      <div className='history-modal-container'>
        {data?.map((action, i) => (
          <HistoryAction key={i} data={action} />
        ))}
      </div>
    </Modal>
  )
}

export default HistoryModal