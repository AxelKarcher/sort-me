import './Switch.scss'

const Switch = ({value, setter, trueLabel, falseLabel}) => (
  <div id='switch-container' onClick={() => setter((old) => !old)}>
    <div className={'choice' + (value ? ' choose' : '')}>
      {trueLabel}
    </div>
    <div className={'choice' + (!value ? ' choose' : '')}>
      {falseLabel}
    </div>
  </div>
)

export default Switch