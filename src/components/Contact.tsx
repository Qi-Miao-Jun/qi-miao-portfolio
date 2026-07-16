import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Hls from 'hls.js'

const MARQUEE_TEXT = 'BUILDING THE FUTURE • '

const socials = [
  { label: 'Bilibili', href: 'https://space.bilibili.com/171372331?spm_id_from=333.1007.0.0' },
  { label: 'TikTok', href: 'https://www.douyin.com/user/MS4wLjABAAAAHKKi0cGPnuI8AAlASVN_3NwQvCalLBQxys0hsaKNt9A?from_tab_name=main&vid=7549837847461776683' },
]

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // HLS video setup (same as hero, flipped)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource('https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8')
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
    }
  }, [])

  return (
    <section id="contact" className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background video (flipped) */}
      <div className="absolute inset-0 overflow-hidden scale-y-[-1] opacity-30">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Marquee */}
      <div className="relative z-10 overflow-hidden py-8 md:py-12">
        <div className="flex whitespace-nowrap">
          <div ref={marqueeRef} className="flex animate-marquee">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/10 uppercase whitespace-nowrap pr-8"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 text-center px-6 mb-16 md:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary mb-8"
        >
          Let's build something <span className="not-italic">great</span>
        </motion.h2>
        <motion.a
          href="https://mail.qq.com/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 rounded-full text-base md:text-lg px-8 md:px-10 py-4 md:py-5 border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-all duration-300 hover-pill"
        >
          邮箱：1641926069@qq.com ↗
        </motion.a>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-10 lg:px-16 pt-8 border-t border-stroke/50">
        {/* Social links */}
        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="text-xs text-muted hover:text-text-primary transition-colors duration-200 uppercase tracking-wider"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Available status */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-muted">Available for projects</span>
        </div>

        {/* Copyright */}
        <span className="text-xs text-muted/50">
          © 2026 七秒 · All rights reserved
        </span>
      </div>
    </section>
  )
}
