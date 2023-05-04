import {useState} from 'react'

import './AuthPage.scss'
import Modal from 'components/Modal/Modal'
import Button from 'components/Button/Button'
import Panel from 'components/Panel/Panel'
import Separator from 'components/Separator/Separator'
import TextField from 'components/TextField/TextField'
import Switch from 'components/Switch/Switch'
import Spinner from 'components/Spinner/Spinner'
import Icon from 'components/Icon/Icon'
import reactSvg from 'icons/react.svg'

const AuthPage = ({}) => {

  const [visible, setVisible] = useState(false)
  const [field, setField] = useState('AuthPage')
  const [areOn, setAreOn] = useState(true)

  return (
    <div id='auth-page-container'>
      <Modal visible={visible} handleClose={() => setVisible(false)}>
        <Icon
          size='medium'
          icon={reactSvg}
          onClick={() => console.log('HERE')}
        />
      </Modal>
      <Panel>
        <TextField disabled={!areOn} label='TextField' value={field} setter={setField} />
        <Separator />
        <Switch value={areOn} setter={setAreOn} trueLabel='ON' falseLabel='OFF' />
        <Button disabled={!areOn} label='Open modale' onClick={() => setVisible(true)} />
        <Spinner size='medium' />
      </Panel>
    </div>
  )
}

export default AuthPage