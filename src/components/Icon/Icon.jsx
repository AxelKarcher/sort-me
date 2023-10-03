import './Icon.scss'

const Icon = ({
  disabled, size = 50, icon, onMouseLeave,
  onClick, className, color, onMouseEnter,
}) => {
  return (
    <img
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        icon-container
        ${onClick && ' clickable'}
        ${color && ` ${color}`}
        ${(disabled || onClick === null) && ' disabled'}
        ${className}
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