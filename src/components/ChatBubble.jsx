import React, { useContext, useEffect, useState, forwardRef } from 'react'
import { Context } from '../context/context'

// impliment small gap btwn same user repeated message using repreatedPerson variable

export const ChatBubble = forwardRef( ( props, ref ) => {
    const { messageInfo, externalClasses, id } = props

    const { name, message, person, repeatedPerson } = messageInfo
    const alignmentClass = person === 'self' ? 'self-end items-end' : 'self-start items-start'
    // person: self -> sent message, align to right side
    // persen: other -> received messagge, align to left
    const { colors } = useContext(Context)
    const chatColor = person === 'self' ? colors.selfChatBubble + ' ' + colors.selfTextColor : colors.otherChatBubble + ' ' + colors.otherTextColor


  return (
    <div ref={ref} id={id} className={`anime max-w-[600px] flex flex-col gap-[8px] px-[10px] transition-all 1000ms linear relative ${alignmentClass} ${ externalClasses }`}>
      { !repeatedPerson && <h3 className={`w-fit px-[3px] pt-[30px] ${colors.userText}`}>{ name }</h3> }
      <p className={`text-[15px] w-full break-words ${chatColor} p-[10px] rounded-[10px]`}>{message}</p>
    </div>
  )
})




export const ChatBubbleWithRef = forwardRef((props, ref) => {
  return (
    <div ref={ref} id={props.id} >
      { <ChatBubble messageInfo={props.messageInfo} externalClasses={props.externalClasses}  /> }
    </div>
  )
})



