import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Hls from 'hls.js'

const roles = ['Creative', 'Fullstack', 'Founder', 'Scholar']

const VIDEO_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [key, setKey] = useState(0)
  const [showWechat, setShowWechat] = useState(false)

  // HLS video setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(VIDEO_URL)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = VIDEO_URL
    }
  }, [])

  // Role cycling every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
      setKey((k) => k + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="video-bg"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8"
        >
          COLLECTION '26
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          七秒
        </motion.h1>

        {/* Role line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl lg:text-3xl text-text-primary/80 mb-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          A{' '}
          <span
            key={key}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {roles[roleIndex]}
          </span>
          {' '}lives in Chengdu.
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-sm md:text-base text-muted max-w-md mb-12"
        >
          为了找工作不得不折腾一个个人网站
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="inline-flex gap-4 flex-wrap justify-center"
        >
          <a
            href="#works"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg hover:bg-bg hover:text-text-primary border-2 border-transparent hover:border-[#89AACC] transition-all duration-300 hover:scale-105"
          >
            See Works
          </a>
          <button
            onClick={() => setShowWechat(true)}
            className="rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-all duration-300 hover:scale-105 hover-pill"
          >
            Reach out...
          </button>
        </motion.div>
      </div>

      {/* WeChat QR Modal */}
      {showWechat && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowWechat(false)}
        >
          <div className="relative p-4 bg-surface rounded-2xl border border-stroke">
            <button
              onClick={() => setShowWechat(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-bg border border-stroke text-muted hover:text-text-primary flex items-center justify-center transition-colors"
            >
              ×
            </button>
            <img
              src="/微信.jpg"
              alt="WeChat QR Code"
              className="w-64 h-64 object-cover rounded-xl"
            />
            <p className="text-center text-sm text-muted mt-3">扫码添加微信</p>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute inset-0 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}
