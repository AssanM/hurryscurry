import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useResolvedPath } from 'react-router-dom';

const Collection = () => {

  const {products, search, showSearch, categories} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [game,setGame] = useState([])
  const [categoryList,setCategoryList] = useState([])
  const [region,setRegion] = useState([])
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavant');
  const [gameFilter, setGameFilter] = useState([]);
  const [regionFilter, setRegionFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const toggleCategory = (e)=>{
    if (category.includes(e.target.value))
    {
      setCategory(prev=> prev.filter(item=> item != e.target.value))
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleGame = (e)=>{    
    if (gameFilter.includes(e.target.value))
    {
      setGameFilter(prev=> prev.filter(item=> item != e.target.value))
    }
    else{
      setGameFilter(prev => [...prev, e.target.value])
    }
  }

  const toggleRegion = (e)=>{
    if (regionFilter.includes(e.target.value))
    {
      setRegionFilter(prev=> prev.filter(item=> item != e.target.value))
    }
    else{
      setRegionFilter(prev => [...prev, e.target.value])
    }
  }

  const toggleCategoryFilter = (e)=>{
    if (categoryFilter.includes(e.target.value))
    {
      setCategoryFilter(prev=> prev.filter(item=> item != e.target.value))
    }
    else{
      setCategoryFilter(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory =(e)=>{
    if (subCategory.includes(e.target.value))
    {
      setSubCategory(prev=> prev.filter(item=> item != e.target.value))
    }
    else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter =()=>{
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    if (gameFilter.length>0) {
      productsCopy = productsCopy.filter(item => gameFilter.includes(item.game));
    }
    if (categoryFilter.length>0) {
      productsCopy = productsCopy.filter(item => categoryFilter.includes(item.categoryFilter));
    }
    if (regionFilter.length>0) {
      productsCopy = productsCopy.filter(item => regionFilter.includes(item.region));
    }

    setCurrentPage(1);
    setFilterProducts(productsCopy)
  }

  const sortProduct = ()=>{
    let fpCopy = filterProducts.slice();
    switch(sortType)
    {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }

  const getFilterData = ()=>{
    setGame(categories.filter(item => item.type === "game"))
    setCategoryList(categories.filter(item => item.type === "category"))
    setRegion(categories.filter(item => item.type === "region"))
  }

  useEffect(()=>{
    applyFilter();
    getFilterData();
  },[gameFilter, regionFilter, categoryFilter, search, showSearch, products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);
  const paginatedProducts = filterProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 boder-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
        <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} alt="" />

        {/* Game Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'> GAME</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-200'>
            {game.map((item, index)=>(
              <p className='flex gap-2' key={index}>
                <input type="checkbox" className='w-3' value={item.name} onChange={toggleGame}/> {item.name}
              </p>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-5 ${showFilter? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'> CATEGORY</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-200'>
            {categoryList.map((item, index)=>(
              <p className='flex gap-2' key={index}>
                <input type="checkbox" className='w-3' value={item.name} onChange={toggleCategoryFilter}/> {item.name}
              </p>
            ))}
          </div>
        </div>

        {/* Region Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-5 ${showFilter? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'> REGION</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-200'>
            {region.map((item, index)=>(
              <p className='flex gap-2' key={index}>
                <input type="checkbox" className='w-3' value={item.name} onChange={toggleRegion}/> {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
  <div className='flex justify-between text-base sm:text-2xl mb-7'>
        <div className="relative inline-block w-60">
  <select
    onChange={(e) => setSortType(e.target.value)}
    className="bg-transparent text-sm px-2 py-1 text-white border-2 border-white rounded appearance-none w-full pr-8 focus:outline-none focus:ring-0"
    value={sortType}
  >
    <option value="relavant">Sort by: Relevant</option>
    <option value="low-high">Price: Low to High</option>
    <option value="high-low">Price: High to Low</option>
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white">
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
  </div>
</div>

        {/* Product Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {paginatedProducts.map((item, index)=>(
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap text-sm">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border border-white ${
                  currentPage === i + 1 ? 'bg-white text-black' : 'text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection