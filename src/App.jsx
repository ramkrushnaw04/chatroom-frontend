import React, { useState, useRef, useEffect } from 'react'
import { Context } from './context/context'
import Chat from './components/Chat'
import ChatInput from './components/ChatInput'
import TopBar from './components/TopBar'
import { v4 } from 'uuid'
import StartScreen from './pages/StartScreen'

const App = () => {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')
  const id = useRef(v4()) // create a new id for each new instance to differentiate this client from others
  const [isStartscreenOver, setIsStartscreenOver] = useState(false)
  // redundent: not impliments properly
  const [colors, setColors] = useState(
    {
      selfChatBubble: 'bg-[#6983ff]',
      otherChatBubble: 'bg-[#2f3347]',
      appBackground: 'bg-[#1c202a]',
      topBar: 'bg-[#242837]',
      topBarText: 'text-[#dadada]',
      icon: 'bg-[#bb773b]',
      otherTextColor: 'color-[#494b61]',
      selfTextColor: 'color-[#8da8fb]',
      messageBoxBg: 'bg-[#404050]',
      messageBoxText: 'text-[#dadada]',
      onlineStatusColor: 'bg-[#404869]',
      messageAlertText: 'text-[#dadada]',
      userText: 'text-[#dadada]',
      startScreenMessageText: 'text-white'
    })

    // light mode colors
  // const [colors, setColors] = useState(
  //   {
  //     selfChatBubble: 'bg-[#76adff]', 
  //     otherChatBubble: 'bg-[#ede9d0]', 
  //     appBackground: 'bg-[#fff]', 
  //     topBar: 'bg-[#e9f5ff]', 
  //     topBarText: 'text-[#000]',
  //     icon: 'bg-[#fc8955]',
  //     otherTextColor: 'text-[#424242]',
  //     selfTextColor: 'text-[#white]',
  //     messageBoxBg: 'bg-[#c9d2ee]',
  //     messageBoxText: 'text-[#000]',
  //     onlineStatusColor: 'bg-[#7ea2da]',
  //     messageAlertText: 'text-[#424242]',
  //     userText: 'text-[#424242]',
  //    startScreenMessageText: 'text-black'  
  //   })


  return (
    <main className='w-[100%] m-auto' >

      <Context.Provider value={{ messages, setMessages, name, setName, id: id.current, setIsStartscreenOver, colors, setColors }}>
        {isStartscreenOver ? (
          <>
            <TopBar height='h-[70px]' />
            <Chat height='h-[calc(100svh-140px)]' />
            <ChatInput height='h-[70px]' />
          </>
        ) :
          <>
            <StartScreen />
          </>
        }
      </Context.Provider>
      
    </main>
  )
}

export default App
