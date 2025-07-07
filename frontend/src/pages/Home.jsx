import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Catalog from '../components/Catalog'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <div>
      <Helmet>
        {/* 🔑 Заголовок страницы (вкладка браузера и SEO) */}
        <title>Hurry-Scurry - Магазин игровых аккаунтов</title>

        {/* 📄 Описание страницы для поисковых систем */}
        <meta name="description" content="Продажа аккаунтов Steam, Genshin Impact, HSR, ZZZ. Гарантия, низкие цены." />

        {/* 🤖 Управление индексацией (поисковые роботы) */}
        <meta name="robots" content="index, follow" />

        {/* ✅ Верификация Google Search Console */}
        <meta name="google-site-verification" content="87CnwOsBg00Z2GWJgLExKvB-CcA7qbb75wfx2OX-hPI" />

        {/* 🌐 Open Graph для Facebook, Telegram и др. */}
        <meta property="og:title" content="Hurry-Scurry - Аккаунты игр по выгодной цене" />
        <meta property="og:description" content="Steam, Genshin Impact, HSR, ZZZ — гарантия и низкие цены!" />
        <meta property="og:image" content="https://hurry-scurry.com/preview.jpg" />
        <meta property="og:url" content="https://hurry-scurry.com/" />
        <meta property="og:type" content="website" />

        {/* 🐦 Twitter-карта превью */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hurry-Scurry - Магазин аккаунтов" />
        <meta name="twitter:description" content="Продажа аккаунтов игр. Надёжно и выгодно!" />
        <meta name="twitter:image" content="https://hurry-scurry.com/preview.jpg" />
      </Helmet>

      <Hero />
      <Catalog />
      <LatestCollection />
      <BestSeller />
      {/* <OurPolicy /> */}
      {/* <NewsLetterBox /> */}
    </div>
  )
}

export default Home
