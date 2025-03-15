import React, {useState} from 'react'
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'
const Carousel = ({data}) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = ()=>{
        setSlide(slide === data.length-1 ?0:slide+1);
    }
    const prevSlide = ()=>{
        setSlide(slide === 0? data.length-1:slide-1);
    }
  return (
    <div className='flex items-center justify-center w-[600px] h-[400px] relative'>
        <BsArrowLeftCircleFill className='absolute w-[2rem] h-[2rem] text-white hover:cursor-pointer left-[-2rem]' onClick={prevSlide}/>
            {data.map((item, index)=>{
                return <img src={item.image[0]} alt={item.name} key={index} className={slide === index? "rounded-[0.5rem] w-[100%] h-[100%]": "rounded-[0.5rem] w-[100%] h-[100%] hidden"}/>
            })}
        <BsArrowRightCircleFill className='absolute w-[2rem] h-[2rem] text-white hover:cursor-pointer right-[-2rem]' onClick={nextSlide}/>
        <span className='flex absolute bottom-[1rem]'>
            {
                data.map((_, index)=>{
                    return <button key={index} onClick={()=>setSlide(index)} className={ slide=== index?'bg-white h-[0.5rem] w-[0.5rem] rounded-[100%] border-none outline-none ml-[0.2rem] mt-0 cursor-pointer':'h-[0.5rem] w-[0.5rem] rounded-[100%] border-none outline-none ml-[0.2rem] mt-0 cursor-pointer bg-gray-800'}></button>
                })
            }
        </span>
    </div>
  )
}

export default Carousel
