import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Keyboard, Moon, Sun, Menu, X } from 'lucide-react'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    }
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
      setDarkMode(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Keyboard className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SwiftKeys
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition">
                Home
              </Link>
              <Link to="/race" className="text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition">
                Race
              </Link>
              <Link to="/learn" className="text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition">
                Learn
              </Link>
              <Link to="/profile" className="text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light font-medium transition">
                Profile
              </Link>
            </nav>
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700"
          >
            <nav className="flex flex-col px-4 py-3 space-y-3">
              <Link 
                to="/" 
                className="py-2 px-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/race" 
                className="py-2 px-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Race
              </Link>
              <Link 
                to="/learn" 
                className="py-2 px-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Learn
              </Link>
              <Link 
                to="/profile" 
                className="py-2 px-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <div className="flex items-center justify-between py-2 px-3">
                <span className="text-sm text-surface-600 dark:text-surface-400">Dark Mode</span>
                <button 
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-surface-100 dark:bg-surface-700"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Keyboard className="h-5 w-5 text-primary" />
              <span className="font-semibold text-surface-800 dark:text-surface-100">
                SwiftKeys
              </span>
            </div>
            <div className="text-sm text-surface-600 dark:text-surface-400">
              © {new Date().getFullYear()} SwiftKeys. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App