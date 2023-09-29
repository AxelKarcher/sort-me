import './Spinner.scss'

const Spinner = ({size, className, inverted, needMarginTop}) => {
  return (
    <div
      className={`
        spinner-container
        ${(needMarginTop && ' margin-top')}
        ${(size && ` ${size}`)}
        ${(inverted && ' inverted')}
        ${className}
      `}
    />
  )
}

export default Spinner