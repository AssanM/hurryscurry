import React from 'react'
import { assets } from '../assets/assets'
import {SocialIcon} from 'react-social-icons'
import { Link, NavLink } from 'react-router-dom'
import cards from '../assets/cards.png'
const Footer = () => {
  return (
    <div>
      
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 my-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <div className='flex gap-2 mt-3'>
  <img src={cards} alt="cards" className="w-32 h-auto" />
</div>
            <p className='w-full md:w-2-3 text-gray-200'>
            {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. */}
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-300'>
                {/*<li><a href='/'>Главная</a></li>
                <li><a href='/collection'>Коллекция</a></li>
                <li>Как купить</li>
                <li>Смена почты</li>
                <li>Как войти в аккаунт</li>
                <li>Поддержка</li>*/}
          <NavLink to='/'>Главная</NavLink>
          <NavLink to='/paymentprocedure'>Процедура Оплаты</NavLink>
          <NavLink to='/collection'>Коллекция</NavLink>
          <NavLink to='/howtobuy'>Как купить</NavLink>
          <NavLink to='/changeEmail'>Смена почты</NavLink>
          <NavLink to='/howtologin'>Как войти в аккаунт</NavLink>
          <NavLink to='/contact'>Поддержка</NavLink>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-300'>                
                <li>ИП Hurry-Scurry</li>
                <li>ИИН/БИН-590827400448</li>
                <SocialIcon network='telegram' href='https://t.me/HurryScurryStore' target='blank' label='Hurry Scurry'/>
            </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ hurryscurry.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
