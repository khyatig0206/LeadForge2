import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import logoPath from '@/assets/logo.png';

export default function NotQualifiedPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center border-b border-purple-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <a href="/" className="flex items-center gap-2 group">
          <img src={logoPath} alt="LeadForgee" className="h-7" />
          <span className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            LeadForgee
          </span>
        </a>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-lg text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/60 dark:to-purple-800/40 mb-8 mx-auto"
          >
            <svg
              className="w-10 h-10 text-purple-500 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Thanks for applying!
          </motion.h1>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800/60 rounded-2xl border border-purple-100 dark:border-gray-700/60 shadow-xl shadow-purple-100/40 dark:shadow-none p-8 sm:p-10 mb-8 text-left"
          >
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-5">
              We genuinely appreciate you taking the time to apply. After reviewing
              your answers, it looks like we're not the right fit{' '}
              <span className="font-semibold">right now</span> and we want to be
              upfront about why.
            </p>

            <div className="border-l-4 border-purple-400 pl-5 mb-5">
              <p className="text-gray-800 dark:text-gray-200 font-medium text-base sm:text-lg leading-relaxed">
                We only work with coaches who are already generating at least{' '}
                <span className="text-purple-600 dark:text-purple-400 font-bold">
                  $5,000 per month
                </span>{' '}
                and are actively running their coaching or consulting business.
                If that is not you yet, we are not the right fit at this stage.
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              This isn't a door closed forever! It's just about where you are in your
              journey right now. When your business reaches that milestone, we'd love
              to hear from you again. Keep going! You're closer than you think.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              onClick={() => setLocation('/')}
              className="gradient-purple text-white rounded-full px-8 py-3 hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-purple-200 dark:shadow-none font-semibold"
            >
              Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => setLocation('/apply')}
              className="rounded-full px-8 py-3 border-purple-200 dark:border-gray-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all font-medium"
            >
              Re-apply
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
