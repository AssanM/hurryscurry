import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { Helmet } from 'react-helmet';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleBuyNow = () => {
    addToCart(productData._id);
    navigate('/place-order');
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* 🔻 Helmet для мета-тегов */}
      <Helmet>
        <title>{productData.name} — Купить аккаунт | Hurry-Scurry</title>
        <meta name="description" content={`Купите ${productData.name} всего за ${productData.price} ${currency}. Быстрая доставка и гарантия качества.`} />
        <meta property="og:title" content={`${productData.name} — Купить аккаунт | Hurry-Scurry`} />
        <meta property="og:description" content={`Игровой аккаунт ${productData.name} за ${productData.price} ${currency}. Надёжная покупка.`} />
        <meta property="og:image" content={productData.image[0]} />
        <meta property="og:url" content={`https://hurry-scurry.com/product/${productData._id}`} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${productData.name} — Купить аккаунт`} />
        <meta name="twitter:description" content={`Цена: ${productData.price} ${currency}. Быстро, выгодно, безопасно.`} />
        <meta name="twitter:image" content={productData.image[0]} />
      </Helmet>

      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-[75%] h-auto' alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2l mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>
            {productData.price} {currency}
          </p>
          <p className='mt-5 text-gray-300 md:w-4/5'>{productData.description}</p>

          <button
            onClick={handleBuyNow}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            КУПИТЬ
          </button>

          <hr className='mt-8 sm:w-4/5' />
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;