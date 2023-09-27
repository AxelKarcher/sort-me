import './Panel.scss'

const Panel = ({
  onClick, className, children,
  noShadows, imgBg, title
}) => {
  return (
    <div
      onClick={onClick}
      className={
        'panel-container' +
        (className ? (' ' + className) : '') +
        (noShadows ? ' no-shadows' : '')
      }
    >
      {title && <span id='title'>{title}</span>}
      {children}
    </div>
  )
}

export default Panel