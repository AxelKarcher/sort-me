import './Panel.scss'

const Panel = ({
  onClick, className, children,
  noShadows, imgBg, title
}) => {

  const Separator = () => (
    <div className='separator-container' />
  )

  return (
    <div
      onClick={onClick}
      className={
        'panel-container' +
        (className ? (' ' + className) : '') +
        (noShadows ? ' no-shadows' : '')
      }
    >
      {
        title &&
        <div className='title-container'>
          <span id='title'>{title}</span>
          <Separator />
        </div>
      }
      <div className='children-container'>{children}</div>
    </div>
  )
}

export default Panel