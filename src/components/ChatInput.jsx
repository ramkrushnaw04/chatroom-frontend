import React, { useState, useContext, useEffect, useRef} from 'react'
import { Context } from '../context/context'
import {  socketService } from './socket'
import ImageConformationScreen from './ImageConformationScreen'



const ChatInput = ({height}) => {


    const socket = useRef()
    const typingTimeout = useRef(null)
    const inputRef = useRef()
    const imageInputRef = useRef()
    const [imageUrl, setImageUrl] = useState(null)
    const imageName = useRef('')
    
    useEffect(() => {
        socketService.connect()
        socket.current = socketService.getSocket();
    
      return () => {
        socketService.disconnect()
      }
    }, [])
    
    
    
    const { name, id, colors } = useContext(Context)
    const [message, setMessage] = useState('') // message in input field


    function showTypingIndicator() {
        clearTimeout(typingTimeout.current)
        typingTimeout.current = setTimeout(() => {
            hideTypingIndicator()
        }, 500);
        socket.current.emit('get-typing-user', { name, id, action: 'startTyping' })
        // console.log('typing')
    }

    function hideTypingIndicator() {
        clearTimeout(typingTimeout.current)
        socket.current.emit('get-typing-user', { name, id, action: 'stopTyping' })
        // console.log('stopped typing')
    }
    
    function sendMessage(e) {
        e.preventDefault()

        if(!message)
            return

        socket.current.emit('message', { type: 'message', id, name, message})

        setMessage('')
        inputRef.current.style.height = '45px'
    }

    function adjustInputHeight(e) {
        if(e.target.value.length >= 45) {
            inputRef.current.style.height = '150px'
        }
        else {
            inputRef.current.style.height = '45px'
        }
    }

    function messageChangeHandler(e) {
        setMessage(e.target.value)
        adjustInputHeight(e)
        showTypingIndicator()
    }


    function handleEnterKeypress(e) {
        if(e.code === 'Enter') {
            sendMessage(e)
        }
    }


    function handleSelectImage(e) {
        console.log('selecting image')

        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e) => {
                // Send the image as a Base64 string
                const image = e.target.result
                setImageUrl(image)
                imageName.current = file.name
            };

        }
        imageInputRef.current.value = ''
        
    }



    return (
        <footer className={`${height} ${colors.topBar} flex justify-center items-center`}>

            <Context.Provider value={{ id, imageUrl, setImageUrl, name, imageName: imageName.current }}>
                <ImageConformationScreen height={height} /> 
            </Context.Provider>
            

            <form  onSubmit={sendMessage} className='w-[90%] max-w-[500px] m-auto flex justify-between items-end gap-[10px]' >
                {/* message area */}
                <div className='w-[90%] relative'>
                    <textarea ref={inputRef} name='message' type="text" value={message} onKeyDown={handleEnterKeypress} autoComplete='off' onChange={messageChangeHandler}  placeholder='Message' className={`bg-[#0000] h-[45px] ${colors.messageBox} focus:outline-none w-full rounded-[10px] px-[14px] py-[10px] resize-none absolute bottom-[0px] ${colors.messageBoxBg} ${colors.messageBoxText}`} />
                </div>


                {/* select images */}
                <label htmlFor="selectImage" className='h-[45px] w-[45px] flex justify-center items-center cursor-pointer' >
                    <img className={`${colors.icon} rounded-[10px] p-[10px] `} src="/photo-icon.svg" alt="" />
                </label>
                <input ref={imageInputRef} id='selectImage' type="file" className='hidden' onChange={handleSelectImage} accept='image/*'/>


                {/* send message */}
                <button className={` h-[45px] w-[45px]`}> 
                    <img className={`${colors.icon} rounded-[10px] p-[10px] `} src="/send-icon.svg" alt="" />
                </button>
            </form>

        </footer>
    )
}

export default ChatInput
