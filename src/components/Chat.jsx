import React, { useEffect, useContext, useRef } from 'react'
import { Context } from '../context/context'
import { ChatBubble, ChatBubbleWithRef } from './ChatBubble'
import Image from './ChatImage'
import { v4 } from 'uuid'
import { socketService } from './socket'
import { AlertMessage, AlertMessageWithRef } from './AlertMessage'


// export const socket = getSocketConnection()


const Chat = ({height}) => {

  const socket = useRef()
  const lastEleRef = useRef(null)
  const chatRef = useRef(null)

  // initialize all required initial code here
  useEffect(() => {
    socketService.connect()
    socket.current = socketService.getSocket();

    socket.current.on('message-response', handleMessageResponse)
    socket.current.on('connect', afterConnection)

    // window.addEventListener('resize', handleResize)

    return () => {
      socket.current.off('message-response', handleMessageResponse)
      socketService.disconnect()
    }
  }, [])
  


  const { messages, setMessages, name, id, colors } = useContext(Context)
  let preMessageSenderID = useRef(null)
  


  useEffect(() => {
    // scroll messages into view 

    if(lastEleRef.current && chatRef.current.scrollHeight > chatRef.current.clientHeight) {
      // console.log('scrollign into view', chatRef.current.scrollHeight, chatRef.current.clientHeight)
      setTimeout(() => {
        lastEleRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 0);
    }

  }, [messages]);



  const handleMessageResponse = (message) => {
    setMessages(oldMessages => [...oldMessages, message])
  }

  // after the connection is made, send user data to socket 
  const afterConnection = () => {
    socket.current.emit('get-client-data', { name, id })
  }

  

  
  return (
    <section className={`${colors.appBackground} ${height}  pb-[5px]`} >

      <div ref={chatRef} className=' m-auto h-full flex flex-col justify-start items-center overflow-scroll gap-[4px]'>
        
        {/* <Image imageInfo={{person: 'self', url: './erenyega.jpeg', repeatedPerson: false, name: 'usrName', imageName: 'this is image name'}} /> */}
        
        { messages.map((item, index) => 
          { 
            const len = messages.length

            // fix this later
            // const isAnimation = index === len-1 && chatRef.current.scrollHeight <= chatRef.current.clientHeight  ? 'applyMessageAnimation' : ''
            const isAnimation = ''
            // console.log('not scrollign into view', chatRef.current.scrollHeight, chatRef.current.clientHeight)
            let person = item.id === id ? 'self' : 'other'
            let repeatedPerson = preMessageSenderID.current == item.id ? true : false

            if(item.type === 'message') {
              let messageInfo = item
              messageInfo.person = person
              
              messageInfo.repeatedPerson = repeatedPerson
              preMessageSenderID.current = item.id

              // incoming messages animation                        
              return  <ChatBubble key={v4()} messageInfo={messageInfo} externalClasses={ isAnimation} ref={ index === len-1 ? lastEleRef : null } /> 
            }
            else if (item.type === 'connection-alert' && item.newConnection) {
              return <AlertMessage key={v4()} message={`${item.name} joined the chat!`} externalClasses={ isAnimation} ref={ index === len-1 ? lastEleRef : null } />
            }
            else if (item.type === 'connection-alert' && !item.newConnection) {
              return <AlertMessage key={v4()} message={`${item.name} left the chat.`} externalClasses={ isAnimation} ref={ index === len-1 ? lastEleRef : null } />
            }
            else if(item.type === 'image') {
              let messageInfo = item
              messageInfo.person = person
              
              messageInfo.repeatedPerson = repeatedPerson
              preMessageSenderID.current = item.id

              return <Image key={v4()} imageInfo={ messageInfo } ref={ index === len-1 ? lastEleRef : null }/>
            }
          }
        )}

        {/* reset presenderid for each re-render */}
        { preMessageSenderID.current = null }

      </div>
    </section>
  )
}

export default Chat
