'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Particles from './particles'

import Client01 from '@/public/images/client-01.svg'
import Client02 from '@/public/images/client-02.svg'
import Client03 from '@/public/images/client-03.svg'
import Client04 from '@/public/images/client-04.svg'
import Client05 from '@/public/images/client-05.svg'
import Client06 from '@/public/images/client-06.svg'
import Client07 from '@/public/images/client-07.svg'
import Client08 from '@/public/images/client-08.svg'
import Client09 from '@/public/images/client-09.svg'

// Import Swiper
import Swiper, { Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import { ClientTicker } from '@/types'
Swiper.use([Autoplay])

export default function Clients({ content }: { content: ClientTicker['assetCollection']['items'] }) {
  useEffect(() => {
    const carousel = new Swiper('.clients-carousel', {
      slidesPerView: 'auto',
      spaceBetween: 64,
      centeredSlides: true,
      loop: true,
      speed: 5000,
      noSwiping: true,
      noSwipingClass: 'swiper-slide',
      autoplay: {
        delay: 0,
        disableOnInteraction: true,
      },
    })
  }, [])

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Particles animation */}
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6">
          <Particles className="absolute inset-0 -z-10" quantity={5} />
        </div>

        <div className="py-12 md:py-16">
          <div className="overflow-hidden">
            {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
            {/* * Custom styles in src/css/additional-styles/theme.scss */}
            <div className="clients-carousel swiper-container relative before:absolute before:inset-0 before:w-32 before:z-10 before:pointer-events-none before:bg-gradient-to-r before:from-slate-900 after:absolute after:inset-0 after:left-auto after:w-32 after:z-10 after:pointer-events-none after:bg-gradient-to-l after:from-slate-900">
              <div className="swiper-wrapper !ease-linear select-none items-center">
                {/* Carousel items */}
                {content.map((item, index) => (
                  <div className="swiper-slide !w-auto" key={index}>
                    <Image src={item.url} alt={item.title} width={item.width} height={item.height} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
