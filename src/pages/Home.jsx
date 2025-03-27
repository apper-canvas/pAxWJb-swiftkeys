import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Trophy, BookOpen, BarChart } from 'lucide-react'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [activeTab, setActiveTab] = useState('race')
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light/10 via-white to-secondary-light/10 dark:from-primary-dark/20 dark:via-surface-800 dark:to-secondary-dark/20 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary dark:from-primary-light to-accent bg-clip-text text-transparent"
            >
              Master Typing with SwiftKeys
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-surface-700 dark:text-surface-300 mb-8"
            >
              Improve your typing skills through competitive racing and structured learning. 
              Track your progress and become a typing master.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button 
                onClick={() => setActiveTab('race')}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-soft transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Trophy className="h-5 w-5" />
                Start Racing
              </button>
              <button 
                onClick={() => setActiveTab('learn')}
                className="px-6 py-3 bg-white dark:bg-surface-700 hover:bg-surface-100 dark:hover:bg-surface-600 text-surface-800 dark:text-white border border-surface-200 dark:border-surface-600 font-medium rounded-xl shadow-soft transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <BookOpen className="h-5 w-5" />
                Learn Typing
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="py-16 bg-white dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-surface-100 dark:bg-surface-700 rounded-xl">
                <button
                  onClick={() => setActiveTab('race')}
                  className={`px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                    activeTab === 'race'
                      ? 'bg-white dark:bg-surface-600 text-primary dark:text-primary-light shadow-soft'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                  }`}
                >
                  <Trophy className="h-4 w-4" />
                  Race Mode
                </button>
                <button
                  onClick={() => setActiveTab('learn')}
                  className={`px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                    activeTab === 'learn'
                      ? 'bg-white dark:bg-surface-600 text-primary dark:text-primary-light shadow-soft'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  Learn Mode
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                    activeTab === 'stats'
                      ? 'bg-white dark:bg-surface-600 text-primary dark:text-primary-light shadow-soft'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
                  }`}
                >
                  <BarChart className="h-4 w-4" />
                  Stats
                </button>
              </div>
            </div>
          </div>

          <MainFeature activeTab={activeTab} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SwiftKeys?</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Our platform offers everything you need to improve your typing skills, from competitive racing to structured learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
            >
              <div className="w-12 h-12 bg-primary-light/20 dark:bg-primary-dark/30 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Racing</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Race against others in real-time typing competitions. Track your position and see your WPM live.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
            >
              <div className="w-12 h-12 bg-secondary-light/20 dark:bg-secondary-dark/30 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-secondary dark:text-secondary-light" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Learning</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Follow our structured lessons designed to improve specific typing skills with progressive difficulty.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
            >
              <div className="w-12 h-12 bg-accent/20 dark:bg-accent/30 rounded-xl flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Track your progress with detailed statistics on typing speed, accuracy, and problem areas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary-dark/20 dark:to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Typing Skills?</h2>
            <p className="text-surface-600 dark:text-surface-400 mb-8">
              Join thousands of users who have improved their typing speed and accuracy with SwiftKeys.
            </p>
            <button className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-soft transition-all transform hover:scale-105 flex items-center justify-center gap-2 mx-auto">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home