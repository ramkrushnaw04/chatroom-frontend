import React, { useContext, forwardRef } from 'react'
import { Context } from '../context/context'


export const AlertMessage = forwardRef(( props, ref ) => {
  const { message, externalClasses } = props
  const { colors } = useContext(Context)

  return (
    <div ref={ref} className={`${colors.messageAlertText} text-[14px] text-center pt-[30px] px-[10px] ${ externalClasses }`}>
      { message }
    </div>
  )
})


export const AlertMessageWithRef = forwardRef((props, ref) => {
  return (
    <div ref={ref} >
      { props.children }
    </div>
  )
})


