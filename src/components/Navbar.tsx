import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Work', href: '#works' },
  { label: 'Resume', href: '#contact' },
]

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [active, setActive] = useState('Home')
  const [showWechat, setShowWechat] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href: string, label: string) => {
    setActive(label)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 transition-all duration-300 ${
        scrollY > 100 ? '' : ''
      }`}
    >
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrollY > 100 ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        {/* Logo */}
        <div className="group cursor-pointer p-0.5">
          <div
            className="relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
            style={{
              background: 'linear-gradient(#89AACC, #4E85BF) padding-box, linear-gradient(90deg, #89AACC 0%, #4E85BF 100%) border-box',
              border: '2px solid transparent',
            }}
          >
            <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary">QM</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Nav links */}
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => handleNav(link.href, link.label)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 ${
              active === link.label
                ? 'text-text-primary bg-stroke/50'
                : 'text-muted hover:text-text-primary hover:bg-stroke/50'
            }`}
          >
            {link.label}
          </button>
        ))}

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1" />

        {/* Say hi button */}
        <button
          onClick={() => setShowWechat(true)}
          className="hover-pill text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary bg-surface backdrop-blur-md transition-all duration-200 relative"
        >
          Say hi ↗
        </button>
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
    </nav>
  )
}
