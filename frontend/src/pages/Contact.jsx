import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';
import { SocialIcon } from 'react-social-icons';
import { Helmet } from 'react-helmet';

const Contact = () => {
  return (
    <div>
      {/* 🔻 Мета-теги */}
      <Helmet>
        <title>Связаться с нами | Hurry-Scurry</title>
        <meta name="description" content="Контакты магазина Hurry-Scurry. Наш Telegram. Мы всегда на связи!" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Контакты Hurry-Scurry" />
        <meta property="og:description" content="Свяжитесь с нами через Telegram" />
        <meta property="og:image" content="https://hurry-scurry.com/preview.jpg" />
        <meta property="og:url" content="https://hurry-scurry.com/contact" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Контактная информация Hurry-Scurry" />
        <meta name="twitter:description" content="Наш Telegram, и другие способы связи." />
        <meta name="twitter:image" content="https://hurry-scurry.com/preview.jpg" />
      </Helmet>

      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <div className='flex flex-col justify-center items-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-300'>ИП Hurry-Scurry</p>
          <p className='font-semibold text-xl text-gray-300'>ИИН/БИН-590827400448</p>

          <SocialIcon network='telegram' href='https://t.me/HurryScurryStore' target='blank' label='Hurry Scurry' />
        </div>
      </div>

      {/* <NewsLetterBox /> */}
    </div>
  );
};

export default Contact;