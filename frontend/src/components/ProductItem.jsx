import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext);    
    
  return (
    <Link to={`/product/${id}`} className='text-gray-300 cursor-pointer'>
      <div className=' overflow-hidden'>
        <img src={image[0]} className='w-[50%] hover:scale-110 transition ease-in-out' alt="" />
      </div>
      <p className='pt-2 pb-1 text-sm'>{name}</p>
      <p className=' text-sm font-medium'>{price} {currency}</p>
    </Link>
  )
}

export default ProductItem

