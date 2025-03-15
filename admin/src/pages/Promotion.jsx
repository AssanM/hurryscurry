import React from 'react'
import { useEffect } from 'react'
import {backendUrl} from '../App'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useState } from 'react'
import {assets} from '../assets/assets'

const Promotion = ({token}) => {
    const [list, setList] = useState([])
    const [image1, setImage1] = useState(false)
    const fetchList = async()=>{
        try {
            if (!token)
            {
                return null
            }
            const response = await axios.post(backendUrl+'/api/promotion/list',{},{headers:{token}})
            if(response.data.success)
            {
                setList(response.data.promotions)   
            }
            else{
                toast.error("Server:"+response.data.message);
            }
        } catch (error) {
            toast.error("Local:"+error.message);
        }
    }
    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        try {
            const formData= new FormData()
            formData.append("name","promotion")
            image1 && formData.append("image1", image1)
            const response = await axios.post(backendUrl + "/api/promotion/add", formData,{headers:{token}})
             if (response.data.success) {
                    setImage1(false)
                    await fetchList()
                  }
                  else{
                    toast.error(response.data.message)
                  }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const removePromotion = async(id)=>{
        try {
          const response = await axios.post(backendUrl +"/api/promotion/remove",{id},{headers:{token}});
          if (response.data.success) {
            toast.success(response.data.message);
            await fetchList();
          }
          else{
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
    
      }

    useEffect(()=>{
            fetchList()
        },[token])

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Add Promotion</h1>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <form onSubmit={onSubmitHandler}>        
            <p className='mb-2'> Upload Image</p>
            
                    <div className='flex gap-2'>
                      <label htmlFor="image1">
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
                      </label>
                    </div>
            <button className='w-28 py-3 mt-4 bg-black text-white cursor-pointer' type="submit">ADD</button>
            </form>
        </div>
        <div className='flex flex-col gap-3 mt-2'>
            <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr] items-center py-1 px-3 border bg-gray-100 text-sm'>
                <b>Image</b>
                <b>Name</b>
                <b>Active</b>
                <b className='text-center'>Action</b>
            </div>
            {
                list.map((item,index)=>(
                    
                    <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr] items-center gap-2 py-2 border text-sm'>
                        <p> <img className='w-100' src={item.image[0]} alt="" /></p>
                        <p>{item.name}</p>
                        <p>{item.active?"true":"false"}</p>
                        <p onClick={()=>removePromotion(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Promotion
