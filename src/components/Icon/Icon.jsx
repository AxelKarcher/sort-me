import './Icon.scss'

const Icon = ({disabled, size, icon, onClick}) => (
  <img
    className={
      'icon-container' +
      (disabled ? ' disabled' : '') +
      (size ? ` ${size}` : '') +
      (onClick ? ' btn' : '')}
    src={icon}
    onClick={disabled ? null : onClick}
  />
)

export default Icon