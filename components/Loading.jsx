import React from 'react'
import Image from "next/future/image";
import Loader from "../public/gifs/Loading.gif"


const Loading = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen overflow-hidden bg-[#161621]'>
        <Image src={Loader} width={200} height={200} className="w-full" alt="" priority={true} quality={100} />
    </div>
  )
}

export default Loading