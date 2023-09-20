import './Icon.scss'

const Icon = ({disabled, size, icon, onClick, className}) => (
  <img
    className={
      'icon-container' +
      (disabled ? ' disabled' : '') +
      (onClick ? ' btn' : '') +
      (className ? ` ${className}` : '')
    }
    src={icon}
    onClick={disabled ? null : onClick}
  />
)

export default Icon