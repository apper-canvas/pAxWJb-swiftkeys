import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, AlertTriangle } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-primary dark:text-primary-light" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-soft transition-all"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound