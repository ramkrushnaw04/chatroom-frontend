import React from 'react'

const ImagePreview = ({imageInfo}) => {

    const { url, imageName } = imageInfo

    return (
        <div>
            <div className='w-screen h-100svh bg-[#11141aed] absolute top-[0] left-[0] z-[10] flex flex-col gap-[7px] justify-center items-center'>
                <button className='absolute top-[20px] left-[20px] bg-gray-600 w-[45px] h-[45px] rounded-[50%] flex justify-center items-center'>
                <img src="/cross-icon.svg" alt="" />
                </button>
                <img src={url} className='w-full max-w-[500px]' alt="" />
                <h3>{imageName}</h3>
            </div>
        </div>
    )
}

export default ImagePreview
