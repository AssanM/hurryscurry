import React, { useEffect } from 'react'
import {assets} from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import {backendUrl} from '../App'
import {toast} from 'react-toastify'  

const Add = ({token}) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [accountData, setAccountData] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller,setBestseller] = useState(false);
  const [sizes, setSizes] = useState([])
  const [game, setGame] = useState('Genshin Impact');
  const [region, setRegion] = useState('Europe');
  const [categoryFilter, setCategoryFilter] = useState('Ивентовые и легендарные');
  const [categories, setCategories] = useState([]);

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      //formData.append("category", category)
      //formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      //formData.append("sizes", JSON.stringify(sizes))
      formData.append("game", game);
      formData.append("categoryFilter", categoryFilter);
      formData.append("region", region);
      formData.append("accountData", accountData);
      formData.append("email", email);
      formData.append("password", password);

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData,{headers:{token}})
      
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setBestseller(false)
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
            setCategories(response.data.categories);
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
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'> Upload Image</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div >
          <p className='mb-2'>Game</p>
          <select onChange={(e)=>setGame(e.target.value)} className='w-full px-3 py-2'>
            {/* <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            */}
            {
              categories.map((item, index)=>{
                if (item.type == "game") {
                  return (                  
                    <option value={item.name} key={index}>{item.name}</option>                  
                  )  
                }           
              })
            }
          </select>
        </div>
        <div>
          <p className='mb-2'>Category</p>
          <select onChange={(e)=>setCategoryFilter(e.target.value)} className='w-full px-3 py-2'>
            {/* <option value="Topwear">Topwear</option>
            <option value="Bottomear">Bottomear</option>
            <option value="Winterwear">Winterwear</option>
            */}
            {
              categories.map((item, index)=>{
                if (item.type == "category") {
                  return (                  
                    <option value={item.name} key={index}>{item.name}</option>                  
                  )  
                }           
              })
            }
          </select>
        </div>
        <div>
          <p className='mb-2'>Region</p>
          <select onChange={(e)=>setRegion(e.target.value)} className='w-full px-3 py-2'>
            {/* <option value="Topwear">Topwear</option>
            <option value="Bottomear">Bottomear</option>
            <option value="Winterwear">Winterwear</option>
            */}
            {
              categories.map((item, index)=>{
                if (item.type == "region") {
                  return (                  
                    <option value={item.name} key={index}>{item.name}</option>                  
                  )  
                }           
              })
            }
          </select>
        </div>


        <div>
          <p className='mb-2'>Product price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
        </div>
      </div>
      {/* 
      <div>
        <p className='mb-2'> Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=>setSizes(prev =>prev.includes("S")? prev.filter(item => item !== "S") : [...prev,"S"])}>
            <p className={`${sizes.includes("S") ? 'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={()=>setSizes(prev =>prev.includes("M")? prev.filter(item => item !== "M") : [...prev,"M"])}>
            <p className={`${sizes.includes("M") ? 'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={()=>setSizes(prev =>prev.includes("L")? prev.filter(item => item !== "L") : [...prev,"L"])}>
            <p className={`${sizes.includes("L") ? 'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={()=>setSizes(prev =>prev.includes("XL")? prev.filter(item => item !== "XL") : [...prev,"XL"])}>
            <p className={`${sizes.includes("XL") ? 'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={()=>setSizes(prev =>prev.includes("XXL")? prev.filter(item => item !== "XXL") : [...prev,"XXL"])}>
            <p className={`${sizes.includes("XXL") ? 'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>*/}
      <div className='flex gap-2 mt-2'>
        <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Data</p>
        <input onChange={(e)=>setAccountData(e.target.value)} value={accountData} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Email</p>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white cursor-pointer'>ADD</button>

    </form>
  )
}

export default Add