import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft } from 'lucide-react';
import logoPath from '@/assets/logo.png';

// ─── CONFIG — Replace APPS_SCRIPT_URL after Google Apps Script setup ──────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbygT53JIj0uoytvZVS7h8FkDFpJquWJTH6HJBSSjPpChjFLQeahn2LJIIkxSBqMFYY4/exec';
const CALENDLY_URL = 'https://calendly.com/leadforgee/onboarding';
const TOTAL_STEPS = 7;
// ─────────────────────────────────────────────────────────────────────────────

const BUSINESS_OPTIONS = [
  'I am an active coach or consultant',
  'I am just starting my coaching business',
  'I run an agency or service business',
  'Something else',
];

const TIME_OPTIONS = [
  'Less than 6 months',
  '6 months to 1 year',
  '1 to 3 years',
  '3 years or more',
];

const REVENUE_OPTIONS = [
  'Less than $5,000',
  '$5,000 to $10,000',
  '$10,000 to $20,000',
  '$20,000 or more',
];

interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  instagram: string;
  businessType: string;
  timeInBusiness: string;
  monthlyRevenue: string;
}

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -64 : 64, opacity: 0 }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function QuestionLabel({ num, text }: { num: number; text: string }) {
  return (
    <div className="mb-6">
      <span className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-2 block">
        Question {String(num).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-snug">
        {text}
      </h2>
    </div>
  );
}

function ShortAnswerStep({
  num,
  question,
  value,
  onChange,
  placeholder,
  type = 'text',
  hint,
}: {
  num: number;
  question: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  hint?: string;
}) {
  return (
    <div>
      <QuestionLabel num={num} text={question} />
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
        className="w-full bg-transparent border-0 border-b-2 border-purple-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-gray-900 dark:text-white text-xl py-3 placeholder:text-gray-300 dark:placeholder:text-gray-600 transition-colors"
      />
      {hint && (
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">{hint}</p>
      )}
    </div>
  );
}

function RadioCardStep({
  num,
  question,
  options,
  value,
  onChange,
  warning,
}: {
  num: number;
  question: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  warning?: string | null;
}) {
  return (
    <div>
      <QuestionLabel num={num} text={question} />
      <div className="space-y-3">
        {options.map(opt => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
                selected
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-gray-800/50'
              }`}
            >
              <span
                className={`text-base font-medium ${
                  selected
                    ? 'text-purple-700 dark:text-purple-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {opt}
              </span>
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selected
                    ? 'border-purple-500 bg-purple-500 dark:border-purple-400 dark:bg-purple-400'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {selected && <Check className="w-3.5 h-3.5 text-white" />}
              </span>
            </button>
          );
        })}
      </div>
      {warning && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700"
        >
          <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
            {warning}
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    instagram: '',
    businessType: '',
    timeInBusiness: '',
    monthlyRevenue: '',
  });

  const set = (key: keyof FormData) => (value: string) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  const isQualified = () =>
    formData.businessType === 'I am an active coach or consultant' &&
    formData.timeInBusiness !== 'Less than 6 months' &&
    formData.monthlyRevenue !== 'Less than $5,000';

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return formData.fullName.trim().length > 1;
      case 2: return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 3: return formData.whatsapp.trim().length > 4;
      case 4: return formData.instagram.trim().length > 0;
      case 5: return formData.businessType.length > 0;
      case 6: return formData.timeInBusiness.length > 0;
      case 7: return formData.monthlyRevenue.length > 0;
      default: return false;
    }
  };

  const goNext = async () => {
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep(s => s + 1);
    } else {
      await handleSubmit();
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Fire-and-forget POST to Google Apps Script (mode: no-cors avoids CORS errors;
    // the script still executes and writes the row even though we can't read the response)
    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({
        ...formData,
        qualified: isQualified() ? 'Yes' : 'No',
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});

    // Brief pause for UX feel
    await new Promise(r => setTimeout(r, 700));

    if (isQualified()) {
      window.location.href = CALENDLY_URL;
    } else {
      setLocation('/not-qualified');
    }
  };

  // Warnings for disqualifying selections
  const q5Warning =
    formData.businessType.length > 0 &&
    formData.businessType !== 'I am an active coach or consultant'
      ? 'Our program is specifically designed for active coaches and consultants. You may not be a fit at this stage.'
      : null;

  const q7Warning =
    formData.monthlyRevenue === 'Less than $5,000'
      ? 'We only work with coaches who are already generating at least $5,000 per month. If that is not you yet, we are not the right fit at this stage.'
      : null;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ShortAnswerStep
            num={1}
            question="What is your full name?"
            value={formData.fullName}
            onChange={set('fullName')}
            placeholder="Jane Smith"
          />
        );
      case 2:
        return (
          <ShortAnswerStep
            num={2}
            question="What is your email address?"
            value={formData.email}
            onChange={set('email')}
            placeholder="jane@example.com"
            type="email"
          />
        );
      case 3:
        return (
          <ShortAnswerStep
            num={3}
            question="What is your WhatsApp number?"
            value={formData.whatsapp}
            onChange={set('whatsapp')}
            placeholder="+1 234 567 8900"
            type="tel"
            hint="Include country code (e.g. +1, +44, +91)"
          />
        );
      case 4:
        return (
          <ShortAnswerStep
            num={4}
            question="What is your Instagram handle?"
            value={formData.instagram}
            onChange={set('instagram')}
            placeholder="@yourhandle"
            hint="We'll use this to learn more about your content."
          />
        );
      case 5:
        return (
          <RadioCardStep
            num={5}
            question="What best describes you?"
            options={BUSINESS_OPTIONS}
            value={formData.businessType}
            onChange={set('businessType')}
            warning={q5Warning}
          />
        );
      case 6:
        return (
          <RadioCardStep
            num={6}
            question="How long have you been in business?"
            options={TIME_OPTIONS}
            value={formData.timeInBusiness}
            onChange={set('timeInBusiness')}
            warning={null}
          />
        );
      case 7:
        return (
          <RadioCardStep
            num={7}
            question="What is your current monthly revenue?"
            options={REVENUE_OPTIONS}
            value={formData.monthlyRevenue}
            onChange={set('monthlyRevenue')}
            warning={q7Warning}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center justify-between border-b border-purple-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <a href="/" className="flex items-center gap-2 group">
          <img src={logoPath} alt="LeadForgee" className="h-7" />
          <span className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            LeadForgee
          </span>
        </a>
        <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
          {step} / {TOTAL_STEPS}
        </span>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1 bg-purple-100 dark:bg-gray-700">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Intro text on step 1 only */}
          {step === 1 && (
            <motion.p
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-purple-500 dark:text-purple-400 font-semibold tracking-wide uppercase mb-8"
            >
              Application — Book a free discovery call
            </motion.p>
          )}

          {/* Animated step card */}
          <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-purple-100 dark:border-gray-700/60 shadow-xl shadow-purple-100/40 dark:shadow-none p-8 sm:p-10 min-h-[320px] flex flex-col justify-between">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="flex-1"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100 dark:border-gray-700/50">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className={`flex items-center gap-1.5 text-sm font-medium transition-all ${
                  step === 1
                    ? 'opacity-0 pointer-events-none'
                    : 'text-gray-400 hover:text-purple-600 dark:text-gray-500 dark:hover:text-purple-400'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <Button
                type="button"
                onClick={goNext}
                disabled={!canProceed() || isSubmitting}
                className="gradient-purple text-white rounded-full px-8 py-2.5 hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none font-semibold shadow-lg shadow-purple-200 dark:shadow-none"
              >
                {isSubmitting
                  ? 'Submitting…'
                  : step === TOTAL_STEPS
                  ? 'Submit Application →'
                  : 'Next →'}
              </Button>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-6">
            Takes less than 2 minutes · No commitment required
          </p>
        </div>
      </div>
    </div>
  );
}
