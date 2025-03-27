import { motion } from 'framer-motion'
import { Home, FileQuestion } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 via-white to-secondary-light/10 dark:from-primary-dark/20 dark:via-surface-800 dark:to-secondary-dark/20 py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 overflow-hidden p-8 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
              <FileQuestion className="h-10 w-10 text-primary dark:text-primary-light" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary dark:from-primary-light to-accent bg-clip-text text-transparent">
            404 - Page Not Found
          </h1>
          
          <p className="text-lg text-surface-600 dark:text-surface-400 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-soft transition-all"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </motion.div>
          
          <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
            <p className="text-sm text-surface-500 dark:text-surface-500">
              If you believe this is an error, please contact support.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound