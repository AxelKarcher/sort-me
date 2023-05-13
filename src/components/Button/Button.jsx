import './Button.scss'

const Button = ({
  label, disabled, onClick,
  fullWidth, noShadow
}) => (
  <div
    className={
      'button-container' +
      (noShadow ? ' no-shadow' : '') +
      (fullWidth ? ' full-width' : '') +
      (disabled ? ' disabled' : '')
    }
    onClick={disabled ? null : onClick}
  >
    <span>{label}</span>
  </div>
)

export default Button