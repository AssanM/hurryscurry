import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
const Navbar = () => {

  const [visible, setVisible] = useState(false);

  const {setShowSearch,getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);
  const logout = ()=>{
    navigate('/login')
    localStorage.removeItem('token');
    setToken('')
    setCartItems({})    
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className='w-36' alt='' /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-100'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>ГЛАВНАЯ</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-100 hidden'/>
        </NavLink>
        <NavLink to="/privacy" className="flex flex-col items-center gap-1">
          <p>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-100 hidden'/>
        </NavLink>
        <NavLink to="/terms" className="flex flex-col items-center gap-1">
          <p>ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-100 hidden'/>
        </NavLink>
        {/*<NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>КОЛЛЕКЦИЯ</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-100 hidden'/>
        </NavLink>
        <NavLink to='/howtobuy' className='flex flex-col items-center gap-1'>
          <p>КАК КУПИТЬ</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-100 hidden'/>
        </NavLink>
        */}
        <NavLink to='/changeEmail' className='flex flex-col items-center gap-1'>
          <p>СМЕНА ПОЧТЫ</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-100 hidden'/>
        </NavLink>
        <NavLink to='/howtologin' className='flex flex-col items-center gap-1'>
          <p>КАК ВОЙТИ В АККАУНТ</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-100 hidden'/>
        </NavLink>
        {/*<NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>О НАС</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-100 hidden'/>
        </NavLink>
        */}
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>КОНТАКТЫ</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-100 hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        
      </div>
      {/* Sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible? 'w-full' :'w-0'}`}>
        <div className='flex flex-col text-gray-700'>
          <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>Главная</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/privacy'>Политика конфиденциальности</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/terms'>Пользовательское соглашение</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>Коллекция</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/howtobuy'>Как купить</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/changeEmail'>Смена почты</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/howtologin'>Как войти в аккаунт</NavLink>
          {/* <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>О нас</NavLink>*/}
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>Поддержка</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
