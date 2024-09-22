"use client"

import AOS from "aos"
import { useEffect } from "react"

export default function Animate() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 1000,
      easing: 'ease-out-cubic',
    })
  })

  return null
}
