import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta name="google-site-verification" content="87CnwOsBg00Z2GWJgLExKvB-CcA7qbb75wfx2OX-hPI" />
        <title>Hurry-Scurry - Магазин игровых аккаунтов</title>
        <meta name="description" content="Продажа аккаунтов Steam, Genshin Impact, HSR, ZZZ. Гарантия, низкие цены" />
      </Helmet>
      <Hero />
      <LatestCollection/>
      <BestSeller/>
      {/* <OurPolicy/>*/}
      {/* <NewsLetterBox/>*/}
      <meta name="verification" content="4810fdc5d3d7f041704a130778f565" />
    </div>
  )
}

export default Home
