import './Tooltip.scss'

const Tooltip = ({
  isVisible, children,
  className, handleClose
}) => {



  return (
    <div
      onMouseLeave={handleClose}
      className={`
        tooltip-container
        ${!isVisible && ' not-visible'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Tooltip