import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RefreshCw, Clock, Users, Award, ChevronRight, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

// Sample typing passages
const typingPassages = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once.",
  "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using many programming languages.",
  "Typing is a skill that can be learned and improved with practice. The more you type, the faster and more accurate you will become.",
  "SwiftKeys is a platform designed to help you improve your typing speed and accuracy through competitive racing and structured learning."
]

// Sample lessons
const typingLessons = [
  { id: 1, title: "Home Row Mastery", level: "Beginner", description: "Learn to type without looking at the keyboard by mastering the home row keys (ASDF JKL;)." },
  { id: 2, title: "Top Row Practice", level: "Beginner", description: "Practice typing with the top row keys (QWERTYUIOP) to build muscle memory." },
  { id: 3, title: "Bottom Row Basics", level: "Beginner", description: "Complete your keyboard knowledge with the bottom row keys (ZXCVBNM)." },
  { id: 4, title: "Common Words", level: "Intermediate", description: "Improve your speed by practicing the most common words in English." },
  { id: 5, title: "Numbers & Symbols", level: "Advanced", description: "Master typing numbers and special symbols for complete typing proficiency." }
]

const MainFeature = ({ activeTab }) => {
  // Race mode state
  const [currentPassage, setCurrentPassage] = useState('')
  const [userInput, setUserInput] = useState('')
  const [isRacing, setIsRacing] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [errors, setErrors] = useState(0)
  const [raceComplete, setRaceComplete] = useState(false)
  const [competitors, setCompetitors] = useState([
    { id: 1, name: "AI Player 1", progress: 0, wpm: 0 },
    { id: 2, name: "AI Player 2", progress: 0, wpm: 0 },
  ])
  
  // Learn mode state
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [lessonStarted, setLessonStarted] = useState(false)
  const [lessonInput, setLessonInput] = useState('')
  const [lessonComplete, setLessonComplete] = useState(false)
  const [lessonStats, setLessonStats] = useState({ wpm: 0, accuracy: 0, errors: 0 })
  
  // Stats mode state
  const [userStats, setUserStats] = useState({
    averageWPM: 45,
    bestWPM: 68,
    totalRaces: 12,
    totalLessons: 8,
    averageAccuracy: 92,
    recentProgress: [35, 38, 42, 39, 45, 47, 52, 48, 45]
  })
  
  // Refs
  const inputRef = useRef(null)
  
  // Effect to focus input when race starts
  useEffect(() => {
    if (isRacing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isRacing])
  
  // Effect to simulate competitors progress
  useEffect(() => {
    if (!isRacing || raceComplete) return
    
    const interval = setInterval(() => {
      setCompetitors(prev => {
        return prev.map(competitor => {
          // Random progress increase between 0.2% and 1% per update
          const progressIncrease = Math.random() * 0.8 + 0.2
          const newProgress = Math.min(competitor.progress + progressIncrease, 100)
          
          // Calculate WPM based on progress and time elapsed
          const timeElapsed = (Date.now() - startTime) / 1000 / 60 // in minutes
          const wordsTyped = (currentPassage.split(' ').length * (newProgress / 100))
          const newWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0
          
          return {
            ...competitor,
            progress: newProgress,
            wpm: newWpm
          }
        })
      })
    }, 200)
    
    return () => clearInterval(interval)
  }, [isRacing, raceComplete, startTime, currentPassage])
  
  // Effect to update WPM during race
  useEffect(() => {
    if (!isRacing || !startTime) return
    
    const interval = setInterval(() => {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60 // in minutes
      const wordsTyped = userInput.split(' ').length
      
      if (timeElapsed > 0) {
        setWpm(Math.round(wordsTyped / timeElapsed))
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isRacing, startTime, userInput])
  
  // Start race countdown
  const startRace = () => {
    // Reset race state
    setUserInput('')
    setRaceComplete(false)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setEndTime(null)
    
    // Select random passage
    const randomIndex = Math.floor(Math.random() * typingPassages.length)
    setCurrentPassage(typingPassages[randomIndex])
    
    // Reset competitors
    setCompetitors(prev => prev.map(c => ({ ...c, progress: 0, wpm: 0 })))
    
    // Start countdown
    setCountdown(3)
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          setIsRacing(true)
          setStartTime(Date.now())
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }
  
  // Handle user typing in race mode
  const handleRaceInput = (e) => {
    if (!isRacing || raceComplete) return
    
    const value = e.target.value
    setUserInput(value)
    
    // Calculate accuracy
    let errorCount = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentPassage[i]) {
        errorCount++
      }
    }
    
    setErrors(errorCount)
    const calculatedAccuracy = Math.max(0, Math.round(((value.length - errorCount) / value.length) * 100)) || 100
    setAccuracy(calculatedAccuracy)
    
    // Calculate user progress
    const progress = (value.length / currentPassage.length) * 100
    
    // Check if race is complete
    if (value.length >= currentPassage.length) {
      const endTimeNow = Date.now()
      setEndTime(endTimeNow)
      setIsRacing(false)
      setRaceComplete(true)
      
      // Calculate final WPM
      const timeElapsedMinutes = (endTimeNow - startTime) / 1000 / 60
      const wordsTyped = currentPassage.split(' ').length
      setWpm(Math.round(wordsTyped / timeElapsedMinutes))
      
      // Save stats to local storage
      const stats = JSON.parse(localStorage.getItem('swiftkeys-stats') || '{}')
      const updatedStats = {
        ...stats,
        races: (stats.races || 0) + 1,
        bestWPM: Math.max(stats.bestWPM || 0, Math.round(wordsTyped / timeElapsedMinutes)),
        lastWPM: Math.round(wordsTyped / timeElapsedMinutes),
        lastAccuracy: calculatedAccuracy
      }
      localStorage.setItem('swiftkeys-stats', JSON.stringify(updatedStats))
      
      // Update user stats
      setUserStats(prev => ({
        ...prev,
        totalRaces: prev.totalRaces + 1,
        bestWPM: Math.max(prev.bestWPM, Math.round(wordsTyped / timeElapsedMinutes)),
        averageWPM: Math.round((prev.averageWPM * prev.totalRaces + Math.round(wordsTyped / timeElapsedMinutes)) / (prev.totalRaces + 1)),
        recentProgress: [...prev.recentProgress, Math.round(wordsTyped / timeElapsedMinutes)].slice(-9)
      }))
    }
  }
  
  // Start lesson
  const startLesson = (lesson) => {
    setSelectedLesson(lesson)
    setLessonStarted(true)
    setLessonInput('')
    setLessonComplete(false)
    
    // Generate lesson content based on lesson id
    let lessonContent = ""
    switch (lesson.id) {
      case 1: // Home Row
        lessonContent = "asdf jkl; asdf jkl; fjdk slal fjdk slal jfkd lsja jfkd lsja"
        break
      case 2: // Top Row
        lessonContent = "qwerty uiop qwerty uiop qwer tyui opqw erty uiop"
        break
      case 3: // Bottom Row
        lessonContent = "zxcv bnm zxcv bnm zxcv bnm zxcv bnm zxcv bnm"
        break
      case 4: // Common Words
        lessonContent = "the and that have with this from they will not but what about which when make like time just know"
        break
      case 5: // Numbers & Symbols
        lessonContent = "1234 5678 90!@ #$%^ &*() 1234 5678 90!@ #$%^ &*()"
        break
      default:
        lessonContent = "Practice typing this text to improve your speed and accuracy."
    }
    
    setCurrentPassage(lessonContent)
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }
  
  // Handle user typing in learn mode
  const handleLessonInput = (e) => {
    if (lessonComplete) return
    
    const value = e.target.value
    setLessonInput(value)
    
    // Calculate accuracy
    let errorCount = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentPassage[i]) {
        errorCount++
      }
    }
    
    // Check if lesson is complete
    if (value.length >= currentPassage.length) {
      setLessonComplete(true)
      
      // Calculate WPM (assuming average word length of 5 characters)
      const wordsTyped = currentPassage.length / 5
      const timeElapsedMinutes = 0.5 // Assume 30 seconds for simplicity
      const calculatedWpm = Math.round(wordsTyped / timeElapsedMinutes)
      
      // Calculate accuracy
      const calculatedAccuracy = Math.max(0, Math.round(((value.length - errorCount) / value.length) * 100)) || 100
      
      setLessonStats({
        wpm: calculatedWpm,
        accuracy: calculatedAccuracy,
        errors: errorCount
      })
      
      // Update user stats
      setUserStats(prev => ({
        ...prev,
        totalLessons: prev.totalLessons + 1,
        averageAccuracy: Math.round((prev.averageAccuracy * prev.totalRaces + calculatedAccuracy) / (prev.totalRaces + 1))
      }))
    }
  }
  
  // Render race mode
  const renderRaceMode = () => (
    <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 overflow-hidden">
      {!isRacing && !raceComplete ? (
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Race?</h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            Test your typing speed and accuracy against other players. Type the passage as quickly and accurately as possible.
          </p>
          
          {countdown === 3 ? (
            <button 
              onClick={startRace}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-soft transition-all transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
            >
              <Play className="h-5 w-5" />
              Start Race
            </button>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-primary dark:text-primary-light mb-2">
                {countdown}
              </div>
              <p className="text-surface-600 dark:text-surface-400">
                Get ready to type!
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-6">
          {/* Race stats */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-surface-100 dark:bg-surface-700 px-4 py-2 rounded-lg">
              <Clock className="h-5 w-5 text-primary dark:text-primary-light" />
              <span className="font-medium">{wpm} WPM</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-100 dark:bg-surface-700 px-4 py-2 rounded-lg">
              <CheckCircle className={`h-5 w-5 ${accuracy > 90 ? 'text-secondary' : accuracy > 70 ? 'text-amber-500' : 'text-red-500'}`} />
              <span className="font-medium">{accuracy}% Accuracy</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-100 dark:bg-surface-700 px-4 py-2 rounded-lg">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="font-medium">{errors} Errors</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-100 dark:bg-surface-700 px-4 py-2 rounded-lg">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-medium">{competitors.length + 1} Racers</span>
            </div>
          </div>
          
          {/* Race passage */}
          <div className="bg-surface-50 dark:bg-surface-900 p-4 rounded-xl mb-4 font-mono text-lg relative">
            {currentPassage.split('').map((char, index) => {
              let className = ""
              
              if (index < userInput.length) {
                className = userInput[index] === char 
                  ? "text-primary dark:text-primary-light" 
                  : "text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
              } else if (index === userInput.length) {
                className = "relative"
              }
              
              return (
                <span key={index} className={className}>
                  {char}
                  {index === userInput.length && isRacing && (
                    <span className="typing-cursor absolute"></span>
                  )}
                </span>
              )
            })}
          </div>
          
          {/* Input field */}
          <div className="mb-6">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleRaceInput}
              disabled={!isRacing || raceComplete}
              className="w-full px-4 py-3 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
              placeholder={isRacing ? "Type here..." : "Race finished"}
            />
          </div>
          
          {/* Race progress */}
          <div className="space-y-4">
            {/* User progress */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">You</span>
                <span className="text-sm text-surface-600 dark:text-surface-400">{wpm} WPM</span>
              </div>
              <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(userInput.length / currentPassage.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Competitors progress */}
            {competitors.map(competitor => (
              <div key={competitor.id}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{competitor.name}</span>
                  <span className="text-sm text-surface-600 dark:text-surface-400">{competitor.wpm} WPM</span>
                </div>
                <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${competitor.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Race results */}
          {raceComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-surface-50 dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-primary/20 dark:bg-primary-dark/30 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary dark:text-primary-light" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center mb-2">Race Complete!</h3>
              <p className="text-surface-600 dark:text-surface-400 text-center mb-6">
                You typed at {wpm} WPM with {accuracy}% accuracy.
              </p>
              
              <div className="flex justify-center">
                <button 
                  onClick={startRace}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-soft transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  Race Again
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
  
  // Render learn mode
  const renderLearnMode = () => (
    <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 overflow-hidden">
      {!selectedLesson ? (
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">Typing Lessons</h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            Choose a lesson to improve specific typing skills. Progress through the lessons to become a typing master.
          </p>
          
          <div className="space-y-4">
            {typingLessons.map(lesson => (
              <motion.div 
                key={lesson.id}
                whileHover={{ x: 5 }}
                className="p-4 bg-surface-50 dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-700 cursor-pointer"
                onClick={() => startLesson(lesson)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{lesson.title}</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-xs px-2 py-0.5 bg-primary/20 dark:bg-primary-dark/30 text-primary dark:text-primary-light rounded-full">
                        {lesson.level}
                      </span>
                    </div>
                    <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
                      {lesson.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-surface-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{selectedLesson.title}</h3>
            <button 
              onClick={() => {
                setSelectedLesson(null)
                setLessonStarted(false)
                setLessonComplete(false)
              }}
              className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light"
            >
              Back to Lessons
            </button>
          </div>
          
          {/* Lesson instructions */}
          {!lessonComplete && (
            <div className="bg-surface-50 dark:bg-surface-900 p-4 rounded-xl mb-6">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <AlertCircle className="h-5 w-5 text-primary dark:text-primary-light" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Instructions</h4>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Type the text below exactly as shown. Focus on accuracy first, then speed.
                    {selectedLesson.id <= 3 && " Keep your fingers on the home row when not typing."}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Lesson content */}
          <div className="bg-surface-50 dark:bg-surface-900 p-4 rounded-xl mb-4 font-mono text-lg relative">
            {currentPassage.split('').map((char, index) => {
              let className = ""
              
              if (index < lessonInput.length) {
                className = lessonInput[index] === char 
                  ? "text-primary dark:text-primary-light" 
                  : "text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
              } else if (index === lessonInput.length) {
                className = "relative"
              }
              
              return (
                <span key={index} className={className}>
                  {char}
                  {index === lessonInput.length && !lessonComplete && (
                    <span className="typing-cursor absolute"></span>
                  )}
                </span>
              )
            })}
          </div>
          
          {/* Input field */}
          <div className="mb-6">
            <input
              ref={inputRef}
              type="text"
              value={lessonInput}
              onChange={handleLessonInput}
              disabled={lessonComplete}
              className="w-full px-4 py-3 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
              placeholder={lessonComplete ? "Lesson completed" : "Type here..."}
            />
          </div>
          
          {/* Lesson progress */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-surface-600 dark:text-surface-400">Progress</span>
              <span className="text-sm text-surface-600 dark:text-surface-400">
                {Math.round((lessonInput.length / currentPassage.length) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary rounded-full transition-all duration-300"
                style={{ width: `${(lessonInput.length / currentPassage.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Lesson results */}
          {lessonComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-surface-50 dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-secondary/20 dark:bg-secondary-dark/30 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-secondary dark:text-secondary-light" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center mb-2">Lesson Complete!</h3>
              <p className="text-surface-600 dark:text-surface-400 text-center mb-6">
                You typed at {lessonStats.wpm} WPM with {lessonStats.accuracy}% accuracy.
              </p>
              
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => {
                    setLessonInput('')
                    setLessonComplete(false)
                    setTimeout(() => {
                      if (inputRef.current) {
                        inputRef.current.focus()
                      }
                    }, 100)
                  }}
                  className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-xl shadow-soft transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  Try Again
                </button>
                
                <button 
                  onClick={() => setSelectedLesson(null)}
                  className="px-6 py-3 bg-white dark:bg-surface-700 hover:bg-surface-100 dark:hover:bg-surface-600 text-surface-800 dark:text-white border border-surface-200 dark:border-surface-600 font-medium rounded-xl shadow-soft transition-all flex items-center justify-center gap-2"
                >
                  <ChevronRight className="h-5 w-5" />
                  Next Lesson
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
  
  // Render stats mode
  const renderStatsMode = () => (
    <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 overflow-hidden p-6">
      <h3 className="text-2xl font-bold mb-6">Your Typing Stats</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-50 dark:bg-surface-900 p-4 rounded-xl">
          <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Average Speed</div>
          <div className="text-3xl font-bold text-primary dark:text-primary-light">
            {userStats.averageWPM} <span className="text-lg font-normal">WPM</span>
          </div>
        </div>
        
        <div className="bg-surface-50 dark:bg-surface-900 p-4 rounded-xl">
          <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Best Speed</div>
          <div className="text-3xl font-bold text-accent">
            {userStats.bestWPM} <span className="text-lg font-normal">WPM</span>
          </div>
        </div>
        
        <div className="bg-surface-50 dark:bg-surface-900 p-4 rounded-xl">
          <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Average Accuracy</div>
          <div className="text-3xl font-bold text-secondary dark:text-secondary-light">
            {userStats.averageAccuracy}%
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-4">Activity Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-surface-600 dark:text-surface-400">Total Races</span>
              <span className="font-medium">{userStats.totalRaces}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-surface-600 dark:text-surface-400">Total Lessons</span>
              <span className="font-medium">{userStats.totalLessons}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-surface-600 dark:text-surface-400">Problem Keys</span>
              <span className="font-medium">b, m, p, q</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-surface-600 dark:text-surface-400">Last Active</span>
              <span className="font-medium">Today</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Recent Progress</h4>
          <div className="h-40 flex items-end gap-1">
            {userStats.recentProgress.map((wpm, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary-light/30 dark:bg-primary-dark/30 rounded-t-sm"
                  style={{ height: `${(wpm / Math.max(...userStats.recentProgress)) * 100}%` }}
                ></div>
                <div className="text-xs text-surface-600 dark:text-surface-400 mt-1">
                  {wpm}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'race' && renderRaceMode()}
        {activeTab === 'learn' && renderLearnMode()}
        {activeTab === 'stats' && renderStatsMode()}
      </motion.div>
    </AnimatePresence>
  )
}

export default MainFeature