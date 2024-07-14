import React, { forwardRef, useContext, useState } from 'react'
import { Context } from '../context/context'
import ImagePreview from './ImagePreview'

const ChatImage = forwardRef(( props, ref ) => {
  const { imageInfo, id } = props 
  const { url, person, repeatedPerson, name, imageName } = imageInfo

  const { colors } = useContext(Context)

  const [previewVisiblity, setPreviewVisiblity] = useState(false)

  const alignmentClass = person === 'self' ? 'self-end items-end' : 'self-start items-start'
  const borderClass = person === 'self' ? 'border-[#6983ff]' : 'border-[#2f3347]'
  // const chatColor = person === 'self' ? colors.selfChatBubble : colors.otherChatBubble 

  function toggleImagePreview() {
    console.log('image preview clicked')
    setPreviewVisiblity(!previewVisiblity)
  }


  return (
    <>
      <div ref={ref} id={id} className={` ${alignmentClass} px-[10px] flex flex-col gap-[8px] transition-all 1000ms linear relative cursor-pointer ${alignmentClass}`} onClick={toggleImagePreview}>
        { !repeatedPerson && <h3 className={`w-fit px-[3px] pt-[30px] ${colors.userText}`}>{ name }</h3> }
        <img className={`border-[3px] ${borderClass} rounded-[5px] w-[270px] object-contain ${alignmentClass}`} src={url} alt="" />
      </div>

      { previewVisiblity && (
        <div className='w-screen h-100svh bg-[#11141aed] absolute top-[0] left-[0] z-[10] flex flex-col gap-[7px] justify-center items-center'>
            <button className='absolute top-[20px] left-[20px] bg-gray-600 w-[35px] h-[35px] rounded-[50%] flex justify-center items-center' onClick={toggleImagePreview}>
              <img src="/cross-icon.svg" alt="" />
            </button>
            <img src={url} className='w-full max-w-[500px]' alt="" />
            <h3>{imageName}</h3>
        </div>) }
      
    
    </>
  )
})





export default ChatImage