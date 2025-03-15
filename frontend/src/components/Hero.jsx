import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import Carousel from '../pages/Carousel'

const Hero = () => {
    const {promotions} = useContext(ShopContext);
  return (
    <div className={`flex h-full flex-com sm:flex-row border border-gray-400 bg-black bg-[url(${assets.hero_img})]`}>
        {/* Hero Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-gray-200'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>НАШИ АКЦИИ</p>
                </div>
                {/* <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
                */}
            </div>
        </div>
        {/* Hero Right Side */}
        {/*<img src={assets.promotion} className='w-full h-[50%] sm:w-1/2' alt="" />*/}
        <Carousel data={promotions}/>
    </div>
  )
}

export default Hero
