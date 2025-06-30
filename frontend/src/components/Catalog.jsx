import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const ITEMS_PER_PAGE = 10;

const Catalog = () => {
  const { products } = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState([]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setVisibleProducts(products.slice(startIndex, endIndex));
  }, [products, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'ВСЕ'} text2={'ТОВАРЫ'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-400'>
          {/* Здесь можно добавить описание каталога */}
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {visibleProducts.length > 0 ? (
          visibleProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        ) : (
          <p className='col-span-full text-center text-gray-400'>
            Нет товаров для отображения.
          </p>
        )}
      </div>

      {/* Pagination controls */}
      <div className='flex justify-center items-center gap-2 mt-8'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50'
        >
          ← Назад
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50'
        >
          Вперёд →
        </button>
      </div>
    </div>
  );
};

export default Catalog;