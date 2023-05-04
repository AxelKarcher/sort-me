import './Button.scss'

const Button = ({label, disabled, onClick}) => (
  <div
    className={'button-container' + (disabled ? ' disabled' : '')}
    onClick={disabled ? null : onClick}
  >
    <span>{label}</span>
  </div>
)

export default Button