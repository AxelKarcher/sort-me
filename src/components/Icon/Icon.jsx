import './Icon.scss'

const Icon = ({
  disabled, size = 50, icon,
  onClick, className
}) => {
  return (
    <img
      className={`
        icon-container
        ${disabled && ' disabled'}
        ${onClick && ' clickable'}
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