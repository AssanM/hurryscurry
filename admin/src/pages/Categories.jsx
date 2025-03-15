import React, { useEffect } from 'react'
import { useState } from 'react'
import {backendUrl} from '../App'
import axios from 'axios'
import {toast} from 'react-toastify'

const Categories = ({token}) => {
    
    const [list, setList] = useState([]);
    const [game,setGame] = useState('')
    const [category,setCategory] = useState('')
    const [region,setRegion] = useState('')

    const onGameSubmitHandler = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(backendUrl + "/api/category/add", {name:game, type:"game"},{headers:{token}})
            console.log(response);
            
            if (response.data.success) {
                setGame('')
                await fetchList()
            }
            else{
                toast.error("Server:"+response.data.message)
            }
        } catch (error) {
            toast.error("Local:"+error.message)
        }
    }
    const onCategorySubmitHandler = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(backendUrl+'/api/category/add',{name:category, type:"category"},{headers:{token}})
            if (response.data.success) {
                setCategory('')
                await fetchList()
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const onRegionSubmitHandler = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(backendUrl+'/api/category/add',{name:region, type:"region"},{headers:{token}})
            if (response.data.success) {
                setRegion('')
                await fetchList()
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchList = async()=>{
        try {
            if (!token)
            {
                return null;
            }
            const response = await axios.post(backendUrl+'/api/category/list',{},{headers:{token}})
            if(response.data.success)
            {
                setList(response.data.categories.sort((a,b)=>(b.type-a.type)))
            }
            else{
                toast.error(response.data.message);
            }
        } catch (error) {
                toast.error(error.message);
        }
    }

    const removeCategory = async(id)=>{
        try {
          const response = await axios.post(backendUrl +"/api/category/remove",{id},{headers:{token}});
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
    <div >
        <h1 className='text-2xl font-bold mb-4'>Create Categories</h1>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <form onSubmit={onGameSubmitHandler}>        
            <div className='w-full'>
                <p className='mb-2'>Create Game Category</p>
                <input onChange={(e)=>setGame(e.target.value)} value={game} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
            </div>
            <button className='w-28 py-3 mt-4 bg-black text-white cursor-pointer' type="submit">ADD</button>
            </form>
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <form onSubmit={onCategorySubmitHandler}>        
                <div className='w-full'>
                    <p className='mb-2'>Create Category</p>
                    <input onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
                </div>
                <button className='w-28 py-3 mt-4 bg-black text-white cursor-pointer' type="submit">ADD</button>
            </form>
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <form onSubmit={onRegionSubmitHandler}>        
                <div className='w-full'>
                    <p className='mb-2'>Create Region</p>
                    <input  onChange={(e)=>setRegion(e.target.value)} value={region} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
                </div>
                <button className='w-28 py-3 mt-4 bg-black text-white cursor-pointer' type="submit">ADD</button>
            </form>
        </div>
        <div className='flex flex-col gap-2 mt-2'>
            <div className='hidden md:grid grid-cols-[1fr_3fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                <b>Type</b>
                <b>Name</b>
                <b className='text-center'>Action</b>
            </div>
            {
                list.map((item,index)=>(
                    <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr] items-center gap-2 py-2 border text-sm'>
                        <p>{item.type}</p>
                        <p>{item.name}</p>
                        <p onClick={()=>removeCategory(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Categories
