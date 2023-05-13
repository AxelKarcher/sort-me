import './Panel.scss'
import {secondaryCloudy, shadowCloudy} from 'styles/colors.js'

const Panel = ({
  onClick, className, children,
  noShadows, imgBg, title
}) => {

  const bgImg = `linear-gradient(to bottom, ${secondaryCloudy}, ${shadowCloudy}), url(${imgBg})`

  return (
    <div
      onClick={onClick}
      className={
        'panel-container' +
        (className ? (' ' + className) : '') +
        (noShadows ? ' no-shadows' : '')
      }
      style={{backgroundImage: imgBg ? bgImg : ''}}
    >
      {title && <span id='title'>{title}</span>}
      {children}
    </div>
  )
}

export default Panel