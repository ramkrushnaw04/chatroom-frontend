import React, { useEffect, useState, useContext, useRef } from 'react'
import {  socketService } from './socket'
// import { socket } from './Chat'
import { Context, capitalize } from '../context/context'
import { v4 } from 'uuid'

const TopBar = ({height}) => {

  const socket = useRef()

  const { id, colors, setIsStartscreenOver, setColors, setMessages, setName } = useContext(Context)
  const [allClients, setAllClients] = useState([])
  const [modeIcon, setModeIcon] = useState('/light-mode-icon.svg')
 

  const handleClientNames = (data) => {
    setAllClients(data)
  }
  
  useEffect(() => {
    socketService.connect()
    socket.current = socketService.getSocket()
    socket.current.on('get-all-client-names', handleClientNames)

    return () => {
      socket.current.off('get-all-client-names', handleClientNames)
      socketService.disconnect()
    }
  }, [])


  function handleExitButton(e) {
    socketService.disconnect()
    setIsStartscreenOver(false)
    setMessages([])
    setName('')

  }

  function handleColorScheme(e) {
    e.preventDefault()

    if(modeIcon.includes('light')) {
      setModeIcon('/public/dark-mode-icon.svg')

    }
    else {
      setModeIcon('../public/light-mode-icon.svg')

    }

    // setIsStartscreenOver(true)
    // setColors({
    //   selfChatBubble: 'bg-[#76adff]', 
    //   otherChatBubble: 'bg-[#ede9d0]', 
    //   appBackground: 'bg-[#fff]', 
    //   topBar: 'bg-[#e9f5ff]', 
    //   topBarText: 'text-[#000]',
    //   icon: 'bg-[#fc8955]',
    //   otherTextColor: 'text-[#424242]',
    //   selfTextColor: 'text-[#white]',
    //   messageBoxBg: 'bg-[#c9d2ee]',
    //   messageBoxText: 'text-[#000]',
    //   onlineStatusColor: 'bg-[#7ea2da]',
    //   messageAlertText: 'text-[#424242]',
    //   userText: 'text-[#424242]',
    //   startScreenMessageText: 'text-black'  
    // })
  }

  return (
    <header className={`${height} ${colors.topBar} ${colors.topBarText} text-white flex justify-between items-center px-[10px]`}>
      <div className='h-full w-[calc(100%-100px)] flex justify-start items-center gap-[25px] overflow-scroll '>
        <p className={ `${colors.onlineStatusColor} px-[15px] py-[5px] min-w-[140px] text-center rounded-[30px] text-[14px]`}>{Object.entries(allClients).length} people online</p>
        <p className='min-w-fit'>You</p>
        {
          // people typing first
          Object.entries(allClients).filter(item => item[1].typingStatus !== 'idle').map((data, index) => {
            const { name, id: itemID } = data[1]

            if(id !== itemID) {
              return (
                <p key={v4()} className='min-w-fit' >{ capitalize( `${name} is typing...` ) }</p>
              )
            }
          })
        }

        {
          // people not typing later
          Object.entries(allClients).filter(item => item[1].typingStatus === 'idle').map((data, index) => {
            const { name, id: itemID } = data[1]

            if(id !== itemID) {
              return (
                <p key={v4()}>{ capitalize(name) }</p>
              )
            }
          })
        }
      </div>

        <div className='w-[40px] flex justify-between items-center'>
          {/* <button className='  w-[40px] h-full flex justify-center items-center' onClick={handleColorScheme}>
            <img className={`${colors.icon} px-[10px] py-[5px] rounded-[30px] `}  src={modeIcon} alt="" />
          </button> */}

          <button className='  w-[40px] h-full flex justify-center items-center' onClick={handleExitButton}>
            <img className={`${colors.icon} px-[10px] py-[5px] rounded-[30px] `}  src="/exit-icon.svg" alt="" />
          </button>
          
        </div>

    </header>
  )
}

export default TopBar
