import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import {SocialIcon} from 'react-social-icons'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.logo} alt="" />
        <div className='flex flex-col justify-center items-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-300'>Our Store</p>
          
           <p className='text-gray-300'>Address <br /> KZ</p>
           <SocialIcon network='telegram' href='https://t.me/HurryScurryStore' target='blank' label='Hurry Scurry'/>
          {/*<p className='text-gray-300'>Tel: 123456468979 <br />a@a.com</p>          
          <p className='font-semibold text-xl text-gray-200'>Careers at HurryScurry</p>
          <p className='text-gray-300'>Learn more</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore</button>
          */}
        </div>
      </div>

      {/* <NewsLetterBox/>*/}
    </div>
  )
}

export default Contact
