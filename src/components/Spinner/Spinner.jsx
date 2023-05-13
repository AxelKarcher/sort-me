import './Spinner.scss'

const Spinner = ({size, needMarginTop}) => (
  <div
    className={
      'spinner-container ' +
      (needMarginTop ? ' margin-top' : '') +
      (size ? ` ${size}` : '')
    }
  />
)

export default Spinner