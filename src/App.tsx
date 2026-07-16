import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SelectedWorks from './components/SelectedWorks'
import Journal from './components/Journal'
import Explorations from './components/Explorations'
import Stats from './components/Stats'
import Contact from './components/Contact'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <Hero />
      <SelectedWorks />
      <Journal />
      <Explorations />
      <Stats />
      <Contact />
    </div>
  )
}

export default App
