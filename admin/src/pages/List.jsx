import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [editingPrice, setEditingPrice] = useState('')

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handlePriceClick = (index, price) => {
    setEditingIndex(index)
    setEditingPrice(price)
  }

  const handlePriceChange = (e) => {
    setEditingPrice(e.target.value)
  }

  const savePrice = async (id) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/product/update/${id}`,
        { price: editingPrice },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Цена обновлена')
        setEditingIndex(null)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      toast.error('Ошибка при обновлении цены')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Account id</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            {/* Редактируемая цена */}
            {editingIndex === index ? (
              <input
                type="text"
                value={editingPrice}
                onChange={handlePriceChange}
                onBlur={() => savePrice(item._id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') savePrice(item._id)
                }}
                className="border px-1 w-full"
                autoFocus
              />
            ) : (
              <p
                onClick={() => handlePriceClick(index, item.price)}
                className="cursor-pointer text-blue-600 hover:underline"
                title="Нажмите для редактирования"
              >
                {item.price} {currency}
              </p>
            )}

            <p>{item.accid}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default List