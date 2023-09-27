import './Modal.scss'
import Panel from 'components/Panel/Panel'

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
        {children}
      </Panel>
    </div>
  )
}

export default Modal