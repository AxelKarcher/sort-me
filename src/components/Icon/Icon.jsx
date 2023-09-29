import './Icon.scss'

const Icon = ({
  disabled, size = 50, icon,
  onClick, className, color
}) => {
  return (
    <img
      className={`
        icon-container
        ${onClick && ' clickable'}
        ${color && ` ${color}`}
        ${(disabled || onClick === null) && ' disabled'}
        ${className && ` ${className}`}
      `}
      src={icon}
      height={size}
      onClick={disabled ? null : onClick}
      alt='icon'
      draggable='false'
    />
  )
}

export default Icon