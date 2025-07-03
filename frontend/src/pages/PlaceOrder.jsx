import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data =>({...data,[name]:value}));
  }

  const initPay = (order)=>{
    const options ={
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description:'',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response)=>{
        console.log((response));
        try {
          if (data.success) {
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
          
        }
        
      }
    }
    rzp.open()
  }

  const onSubmitHandler = async (event)=>{
    event.preventDefault();
    try {

      let orderItems = [];
      for(const items in cartItems){
        for(const item in cartItems[items])
        {
          if (cartItems[items][item]>0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items:orderItems,
        amount: getCartAmount() + delivery_fee
      }

      if (!token) {
  toast.error("Ошибка: пользователь не авторизован.");
  return;
}

// Просто лог для отладки — можно удалить после теста
console.log("🛡 Отправка заказа с токеном:", token);

      switch (method) {
        case 'walletone':
  const responseW1 = await axios.post(backendUrl + '/api/order/walletone', orderData, { headers: { token } });
  if (responseW1.data.success) {
    window.location.replace(responseW1.data.redirect_url);
  } else {
    toast.error(responseW1.data.message);
  }
  break;
        case 'cod':
          const response = await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }else{
            toast.error(response.data.message);
          }
          break;      
        default:
          break;
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }  
  

const handlePayment = async () => {
  try {
    const response = await fetch('http://localhost:4001/api/walletone/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 1000, // пример суммы
        email: 'user@example.com'
      })
    });

    const data = await response.json();

    if (data.success) {
      // перенаправляем на платёжную ссылку
      window.location.href = data.url;
    } else {
      alert("Ошибка при создании платежа");
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Произошла ошибка при оплате.");
  }
};

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'ИНФОРМАЦИЯ'} text2={'ПОКУПАТЕЛЯ'}></Title>
        </div>
        {/* <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstname' value={formData.firstname} className='border border-gray-300 rounded oy-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
          <input required onChange={onChangeHandler} name='lastname' value={formData.lastname} className='border border-gray-300 rounded oy-1.5 px-3.5 w-full' type="text" placeholder='Last name'/>
        </div>*/}
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded oy-1.5 px-3.5 w-full' type="email" placeholder='Email address'/>
        {/* <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded oy-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded oy-1.5 px-3.5 w-full' type="text" placeholder='City'/>
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded oy-1.5 px-3.5 w-full' type="text" placeholder='State'/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded oy-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'/>
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded oy-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded oy-1.5 px-3.5 w-full' type="number" placeholder='Phone'/>
        */}
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('walletone')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'walletone' ? 'bg-green-400' : ''}`}></p>
  <img className='h-5 mx-4' src="https://static.w1.ru/logo/logo.svg" alt="Wallet One" />
</div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod'?'bg-green-400':''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
