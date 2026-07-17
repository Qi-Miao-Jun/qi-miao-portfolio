import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Volume2, VolumeX, Play, Pause, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: '恐怖短片',
    desc: 'AICG恐怖短片作品',
    span: 'col-span-7',
    aspect: 'aspect-[4/3]',
    video: `${import.meta.env.BASE_URL}最后一次贪睡.mp4`,
    type: 'video',
    link: 'https://www.bilibili.com/video/BV1eGKH6KEBR/?vd_source=de7fa7f290a69ba61f8df42ed92d22ed',
  },
  {
    title: '滑雪',
    desc: '滑雪视频作品',
    span: 'col-span-5',
    aspect: 'aspect-square',
    video: `${import.meta.env.BASE_URL}滑雪.mp4`,
    type: 'video',
    link: 'https://www.bilibili.com/video/BV15GKH6TEqr/?vd_source=de7fa7f290a69ba61f8df42ed92d22ed',
  },
  {
    title: '实验短片',
    desc: '视频作品',
    span: 'col-span-5',
    aspect: 'aspect-square',
    video: `${import.meta.env.BASE_URL}1.mp4`,
    type: 'video',
    link: 'https://www.bilibili.com/video/BV15GKH6KEKc/?vd_source=de7fa7f290a69ba61f8df42ed92d22ed',
  },
  {
    title: '游戏粗剪',
    desc: '游戏实况',
    span: 'col-span-7',
    aspect: 'aspect-[4/3]',
    video: `${import.meta.env.BASE_URL}游戏切片.mp4`,
    type: 'video',
    link: 'https://www.bilibili.com/video/BV1D4HfzsEgC/?vd_source=de7fa7f290a69ba61f8df42ed92d22ed',
  },
]

function VideoPlayer({ video, title, onClose }: { video: string; title: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    const handleTimeUpdate = () => {
      setCurrentTime(videoEl.currentTime)
      if (videoEl.duration > 0) {
        setProgress((videoEl.currentTime / videoEl.duration) * 100)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(videoEl.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    videoEl.addEventListener('timeupdate', handleTimeUpdate)
    videoEl.addEventListener('loadedmetadata', handleLoadedMetadata)
    videoEl.addEventListener('ended', handleEnded)

    return () => {
      videoEl.removeEventListener('timeupdate', handleTimeUpdate)
      videoEl.removeEventListener('loadedmetadata', handleLoadedMetadata)
      videoEl.removeEventListener('ended', handleEnded)
    }
  }, [])

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    if (isPlaying) {
      videoEl.play()
    } else {
      videoEl.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return
    videoEl.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const videoEl = videoRef.current
    if (!videoEl || duration === 0) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration
    
    videoEl.currentTime = newTime
    setCurrentTime(newTime)
    setProgress(percentage * 100)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
      >
        <X size={32} />
      </button>

      {/* Video container */}
      <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
        <video
          ref={videoRef}
          src={video}
          className="w-full rounded-lg"
          autoPlay
          controls={false}
          playsInline
        />

        {/* Custom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
          {/* Progress bar */}
          <div className="mb-4">
            <div
              className="h-1 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleProgressClick}
            >
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Play/Pause button */}
            <button
              onClick={togglePlay}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            {/* Time display */}
            <span className="text-white/60 text-sm tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Volume control */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute}
                className="text-white/80 hover:text-white transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            {/* Title */}
            <span className="text-white/60 text-sm">{title}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function SelectedWorks() {
  const [selectedVideo, setSelectedVideo] = useState<{ video: string; title: string } | null>(null)
  const [showAll, setShowAll] = useState(false)

  const handleCardClick = (project: typeof projects[0]) => {
    if (project.type === 'video') {
      setSelectedVideo({ video: project.video, title: project.title })
    }
  }

  return (
    <section id="works" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary">
              Featured <span className="not-italic">projects</span>
            </h2>
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2.5 text-sm text-muted hover:text-text-primary hover:border-white/20 transition-all duration-300 hover-pill w-fit"
            >
              View all work
              <span>→</span>
            </button>
          </div>
          <p className="text-sm text-muted mt-4 max-w-lg">
            A selection of projects I've worked on, from concept to launch.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
              className={`${project.span} ${project.aspect} bento-card group cursor-pointer`}
              onClick={() => handleCardClick(project)}
            >
              {/* Background media */}
              <div className="absolute inset-0">
                {project.type === 'video' ? (
                  <video
                    src={project.video}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause()
                      e.currentTarget.currentTime = 0
                    }}
                  />
                ) : null}
                {/* Halftone overlay */}
                <div className="absolute inset-0 bento-halftone" />
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl md:text-2xl font-display italic text-text-primary mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-muted">{project.desc}</p>
              </div>

              {/* Hover overlay */}
              <div className="bento-overlay absolute inset-0 flex items-center justify-center">
                <div className="gradient-pill-border rounded-full px-6 py-3 bg-white flex items-center gap-2 text-bg text-sm font-medium">
                  {project.type === 'video' ? '▶ Play' : 'View'} — <span className="font-display italic">{project.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video player modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoPlayer
            video={selectedVideo.video}
            title={selectedVideo.title}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>

      {/* All works modal */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAll(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-surface border border-stroke rounded-3xl p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowAll(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg border border-stroke text-muted hover:text-text-primary flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="mb-6 pr-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px bg-stroke" />
                  <span className="text-xs text-muted uppercase tracking-[0.3em]">All Work</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display italic text-text-primary">
                  Every <span className="not-italic">project</span>
                </h2>
                <p className="text-sm text-muted mt-2">
                  全部作品 · 点击跳转至 B 站观看完整版
                </p>
              </div>

              {/* Project list */}
              <div className="flex flex-col gap-3">
                {projects.map((project, i) => (
                  <motion.a
                    key={project.title}
                    href={project.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                    className="group flex items-center gap-4 p-4 bg-bg/50 border border-stroke rounded-2xl hover:border-white/20 hover:bg-bg/80 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center text-xs text-muted font-mono flex-shrink-0">
                      0{i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-display italic text-text-primary group-hover:text-[#89AACC] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted mt-0.5 truncate">{project.desc}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-stroke flex items-center justify-center text-muted group-hover:text-text-primary group-hover:bg-white/10 group-hover:border-white/20 transition-all flex-shrink-0">
                      <ExternalLink size={15} />
                    </div>
                  </motion.a>
                ))}
              </div>

              <p className="text-xs text-muted/60 text-center mt-6">
                在新标签页打开 B 站视频
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
