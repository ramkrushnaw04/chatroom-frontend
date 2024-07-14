import React, { useState, useEffect, useRef, useContext } from 'react'
import {  socketService } from './socket'
import { Context } from '../context/context'


const ImageConformationScreen = () => {
    
    const { id, imageUrl, setImageUrl, name, imageName } = useContext(Context)
    
    const socket = useRef()
    
    function toggleDisplay() {
        setImageUrl(null)
    }

    function sendImage() {
        const data = {
            type: 'image',
            url: imageUrl,
            id,
            name,
            imageName
        }
        socket.current.emit('message', data)

        toggleDisplay()
    }

    useEffect(() => {

        socketService.connect()
        socket.current = socketService.getSocket();
    
        return () => {
            socketService.disconnect()
        }
    }, [])


    return (
        <div className={`h-[100svh] w-screen bg-[#11141aed] absolute top-[0px] z-[10] left-0  flex justify-center items-center `} style={{display: imageUrl?'':'none'}}>
            <div className=' w-full h-full xs:w-[70%] xs:h-[70%] xs:max-w-[600px] xs:max-h-[600px] bg-[#1a1f28] xs:rounded-[10px] flex flex-col gap-[20px] justify-center items-center'>

                <div className=' h-[60%] w-full mt-[15px] flex flex-col gap-[7px] justify-center items-center'>
                    <img className='h-full m-auto object-contain'  src={imageUrl} alt="" />
                    <h3>{imageName}</h3>
                </div>

                <div className=' flex justify-center items-center gap-[10px] text-[13px] xs:text-[16px]'>
                    <button className='rounded-[5px] bg-[#626f92] px-[8px] py-[2px]' onClick={toggleDisplay}>Cancel</button>
                    <button className='rounded-[5px] bg-[#626f92] px-[8px] py-[2px]' onClick={sendImage}>Send</button>
                </div>
                
            </div>
        </div>
    )
}

export default ImageConformationScreen
