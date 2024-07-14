import React, { useContext, useEffect } from 'react'
import { Context, capitalize } from '../context/context'

const StartScreen = () => {

  const { name, setName, setIsStartscreenOver, colors } = useContext(Context)

  function nameChangeHandler(e) {
    setName(e.target.value)
  }

  function proceed(e) {
    e.preventDefault()
    setIsStartscreenOver(true)
  }


  return (
    <main className={`w-screen h-100svh ${colors.appBackground} flex flex-col justify-center items-center gap-[40px] md:gap-[10px]`}>
      <h1 className={`text-[25px] md:text-[30px] font-bold text-center w-[80%] xs:w-auto ${colors.startScreenMessageText}`}>Hi there! Welcome to chatroom.</h1>

      <form onSubmit={proceed} className=' flex flex-col md:flex-row items-center justify-center gap-[15px] w-[80%] xs:w-[300px]'>
        <input name='name' type="text" value={ capitalize(name) } autoComplete='off' onChange={nameChangeHandler} placeholder="What's your name?" className={`px-[12px] py-[7px] w-full  rounded-[10px] ${colors.messageBoxBg} ${colors.messageBoxText} focus:outline-none`} required/>
        <button type='submit' className={`${colors.icon} px-[12px] py-[6px] rounded-[10px] w-[140px] `}>Lets go!</button>
      </form>
    </main>
  )
}

export default StartScreen
