import './Modal.scss'
import Panel from 'components/Panel/Panel'
import cancelIcon from 'icons/cancel.svg'
import Icon from 'components/Icon/Icon'

const Modal = ({
  isVisible, handleClose,
  children, className, title
}) => {

  const handleClick = (e) => {e?.stopPropagation()}

  return (
    <div
      onClick={handleClose}
      className={
        'modal-container' +
        ` ${className}` +
        (isVisible ? '' : ' not-visible')
      }
    >
      <Panel className='modal-panel' title={title} onClick={handleClick}>
        <Icon
          className='close-icon'
          icon={cancelIcon}
          onClick={handleClose}
          size={20}
        />
        {children}
      </Panel>
    </div>
  )
}

export default Modal