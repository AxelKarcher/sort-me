import './Spinner.scss'

const Spinner = ({size, className, inverted}) => {
  return (
    <div
      className={`
        spinner-container
        ${(size && ` ${size}`)}
        ${(inverted && ' inverted')}
        ${className}
      `}
    />
  )
}

export default Spinner