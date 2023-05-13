import {useRef, useState, useEffect} from 'react'

import './TextField.scss'

const TextField = ({
  label, value, setter, disabled, placeholder,
  isSecure, noStyle, isMultiple, fullWidth, onEnter
}) => {

  const fieldRef = useRef(null)

  const [hasFocus, setHasFocus] = useState(false)

  useEffect(() => {if (disabled) {setHasFocus(false)}}, [disabled])

  useEffect(() => {if (!hasFocus) {fieldRef?.current?.blur()}}, [hasFocus])

  const handleFocus = () => {fieldRef?.current?.focus()}

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter') {
      onEnter()
      setHasFocus(false)
    }
  }

  return (
    <div className={
      'textfield-container' +
      (fullWidth ? ' full-width' : '') +
      (hasFocus ? ' focused' : '') +
      (noStyle ? ' no-style' : '') +
      (disabled ? ' disabled' : '')
    }>
      {
        label &&
        <span className='label' onClick={disabled ? null : handleFocus}>
          {label}
        </span>
      }
      {
        isMultiple
        ?
        <textarea
          className='input'
          ref={fieldRef}
          value={value}
          onChange={(e) => setter(e?.target?.value)}
        />
        :
        <input
          disabled={disabled}
          className='input'
          placeholder={placeholder}
          ref={fieldRef}
          value={value}
          onChange={(e) => setter(e?.target?.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          type={isSecure ? 'password' : 'text'}
          onKeyDown={handleKeyDown}
        />
      }
    </div>
  )
}

export default TextField