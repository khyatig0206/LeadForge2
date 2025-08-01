import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Settings, Bot, Calendar, CalendarCheck, Clock, Video, Gift, Rocket, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import logoPath from '@/assets/logo.png';
import proImage from '@/assets/profile.png';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};



const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.3
    }
  }
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCalendlyReady, setIsCalendlyReady] = useState(false);
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 }
      }
    },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Calendly Inline Widget Loader
  useEffect(() => {
    const calendlyUrl = "https://calendly.com/leadforgee/onboarding";
    const calendlyScriptUrl = "https://assets.calendly.com/assets/external/widget.js";
    const calendlyCssUrl = "https://assets.calendly.com/assets/external/widget.css";

    const addCalendlyScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = calendlyScriptUrl;
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    const addCalendlyStyles = () => {
      if (!document.querySelector(`link[href="${calendlyCssUrl}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = calendlyCssUrl;
        document.head.appendChild(link);
      }
    };

    const loadCalendly = async () => {
      // Add Calendly assets if not already present
      if (!document.querySelector(`script[src="${calendlyScriptUrl}"]`)) {
        addCalendlyStyles();
        await addCalendlyScript();
      } else {
        addCalendlyStyles();
      }

      // Initialize the Calendly widget
      if  ((window as any).Calendly)  {
        (window as any).Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: document.getElementById("calendly-container"),
          prefill: {},
          utm: {}
        });
        setIsCalendlyReady(true);
      }
    };

    loadCalendly();
  }, []);

  const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const yOffset = -44; // Adjust this to your navbar height (in px)
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/testimonial/active`);
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        setTestimonials([]);
      } finally {
        setLoadingTestimonials(false);
      }
    };
    fetchTestimonials();
  }, []);

  const processSteps = [
    {
      icon: Search,
      title: "1. Content Strategy Audit",
      description: "We analyze your current content and identify gaps, then create a strategic content plan designed to attract your ideal coaching clients."
    },
    {
      icon: Settings,
      title: "2. Funnel Building",
      description: "Our team builds high-converting content funnels with automated email sequences that nurture leads and pre-qualify them for sales calls."
    },
    {
      icon: Bot,
      title: "3. Lead Automation",
      description: "We implement automated systems that consistently deliver qualified leads to your calendar, so you can focus on what you do best - coaching."
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-purple-100 dark:border-gray-900">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center min-w-0">
              <img src={logoPath} alt="Leadforgee Logo" className="h-8 md:h-8 mr-2" />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient-purple truncate">
                LeadForgee
              </h1>
            </div>
            <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
              <button 
                onClick={() => scrollToSection('process')}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium whitespace-nowrap"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium whitespace-nowrap"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium whitespace-nowrap"
              >
                About
              </button>
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <div className="md:hidden">
                <ThemeToggle />
              </div>
              <Button 
                onClick={() => scrollToSection('calendly')}
                className="gradient-purple text-white hover:opacity-90 rounded-full transition-all transform hover:scale-105 text-xs sm:text-sm px-3 sm:px-4 py-2 whitespace-nowrap"
              >
                Book Call
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Glow/Gradient Background Effect */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[80vw] h-[60vh] rounded-full blur-3xl opacity-60 bg-gradient-to-br from-purple-300 via-purple-100 to-pink-200 dark:from-purple-900 dark:via-purple-700 dark:to-pink-900"></div>
        </div>
      {/* Notification Banner */}
      <div className="w-full flex justify-center items-center pt-24">
        <div className="bg-gradient-to-r from-purple-500 via-pink-400 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg font-semibold text-sm tracking-wide animate-pulse">
          <i className="fas fa-bolt mr-2"></i>
          Currently Onboarding New Clients
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-8 pb-16 sm:pb-20 w-full overflow-hidden">
        
        <div className="w-full max-w-9xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
               <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-200 mb-4 sm:mb-6 leading-tight p-2">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              
                Our Customizable <span className="text-gradient-purple dark:bg-gradient-to-r dark:from-purple-300 dark:via-purple-400 dark:to-purple-500 dark:bg-clip-text dark:text-transparent"> Content Sales Funnel{" "}</span>
                <br/>
                 </motion.div>
                             <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Will Add Qualified Sales Calls To Your Business On Autopilot.</span>
              
          </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="flex flex-row items-center justify-center gap-4 sm:gap-6 mb-2"
            >
              <Button 
                onClick={() => scrollToSection('calendly')}
                size="lg"
                className="gradient-purple text-white rounded-full hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4"
              >
                <CalendarCheck className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                <span className="hidden sm:inline">Book a Free Discovery Call</span>
                <span className="sm:hidden">Book Free Call</span>
              </Button>
              <Button
                onClick={() => scrollToSection('process')}
                size="lg"
                variant="secondary"
                className="bg-white text-purple-800 border border-purple-200 hover:bg-purple-50 rounded-full transition-all transform hover:scale-105 shadow text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4"
              >
                
                How it works
              </Button>
            </motion.div>
            
            
            <motion.div
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
  className="mt-12 sm:mt-16 px-2"
>
  <div className="flex flex-row items-center justify-center gap-3 sm:gap-8 mt-6 mb-4 px-2">
    {/* Growth Chart */}
    <div className="flex flex-col items-center text-center max-w-[100px] sm:max-w-xs">
      <div className="mb-2 sm:mb-3">
        <span className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl p-2 sm:p-3">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 21H3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <div className="font-semibold text-xs sm:text-lg sm:text-xl text-gray-900 dark:text-white mb-1">Scale Your Sales Without Scaling Your Content Output</div>
    </div>
    {/* Target with Arrow */}
    <div className="flex flex-col items-center text-center max-w-[100px] sm:max-w-xs">
      <div className="mb-2 sm:mb-3">
        <span className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl p-2 sm:p-3 relative">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <div className="font-semibold text-xs sm:text-lg sm:text-xl text-gray-900 dark:text-white mb-1">Attract Only High-Intent Leads Ready to Buy</div>
    </div>
    {/* Robot / Automation Gear */}
    <div className="flex flex-col items-center text-center max-w-[100px] sm:max-w-xs">
      <div className="mb-2 sm:mb-3">
        <span className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl p-2 sm:p-3">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" viewBox="0 0 122.88 105.21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M63.91,18.75v12.16h33.51c5.43,0,9.87,4.44,9.87,9.87v12.47h13.42c1.19,0,2.17,0.97,2.17,2.17v25.28
              c0,1.19-0.97,2.17-2.17,2.17h-13.42v12.47c0,5.43-4.44,9.87-9.87,9.87h-73c-5.43,0-9.87-4.44-9.87-9.87V82.87H2.17
              C0.97,82.87,0,81.9,0,80.71V55.42c0-1.19,0.97-2.17,2.17-2.17h12.38V40.79c0-5.43,4.44-9.87,9.87-9.87h33.51V18.75
              c-3.85-1.26-6.62-4.87-6.62-9.14c0-5.31,4.3-9.61,9.61-9.61c5.31,0,9.61,4.3,9.61,9.61C70.53,13.88,67.75,17.49,63.91,18.75
              L63.91,18.75z" />
            <circle cx="44.18" cy="57.32" r="9.72" fill="#EC407A"/>
            <circle cx="78.7" cy="57.32" r="9.73" fill="#EC407A"/>
            <line x1="54" y1="85" x2="68" y2="85" stroke="#EC407A" strokeWidth="8" strokeLinecap="round"/>
          </svg>
        </span>
      </div>
      <div className="font-semibold text-xs sm:text-lg sm:text-xl text-gray-900 dark:text-white mb-1">Fully Automated System That Works While You Sleep</div>
    </div>
  </div>
</motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className=" py-16 sm:py-20 bg-white dark:bg-gray-800 w-full overflow-hidden" style={{ scrollMarginTop: '96px' }}>
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-purple-600 dark:via-purple-400 dark:to-purple-600 dark:bg-clip-text dark:text-transparent mb-4 px-2 leading-tight pb-2">
            See How Our Funnel Changed Their Business
          </h1>
            {/* <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:bg-gradient-to-r dark:from-purple-600 dark:via-purple-400 dark:to-purple-600 dark:bg-clip-text dark:text-transparent max-w-2xl mx-auto px-2">
              See how our content funnel system transformed their businesses
            </p> */}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="embla"
            ref={emblaRef}
          >
            <div className="embla__container">
              {loadingTestimonials ? (
                <div className="embla__slide">
                  <Card className="gradient-purple-light dark:metallic-card-dark border-purple-100 shadow-lg h-full flex items-center justify-center">
                    <CardContent className="p-8 text-center">
                      <div className="text-lg text-gray-700 dark:text-gray-200">Loading testimonials...</div>
                    </CardContent>
                  </Card>
                </div>
              ) : testimonials.length === 0 ? (
                <div className="embla__slide">
                  <Card className="gradient-purple-light dark:metallic-card-dark border-purple-100 shadow-lg h-full flex items-center justify-center">
                    <CardContent className="p-8 text-center">
                      <div className="text-lg text-gray-700 dark:text-gray-200">No testimonials yet.</div>
                    </CardContent>
                  </Card>
                </div>
              ) : testimonials.map((testimonial, index) => (
                <div key={testimonial._id || index} className="embla__slide">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: 2,
                      transition: { duration: 0.3 }
                    }}
                    className="h-full"
                  >
                    <Card className="gradient-purple-light dark:metallic-card-dark border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full transform">
                      <CardContent className="p-8">
                        <div className="flex items-center mb-6">
                          <motion.img 
                            src={testimonial.imageUrl || testimonial.image || 'https://via.placeholder.com/150'} 
                            alt={`${testimonial.name} testimonial portrait`} 
                            className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-purple-200 dark:border-purple-400" 
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                            <p className="text-purple-600 dark:text-purple-300 font-medium">{testimonial.position}</p>
                            <div className="flex items-center mt-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={i}
                                  className={
                                    i < testimonial.rating
                                      ? 'fas fa-star text-yellow-400 text-xs mr-0.5'
                                      : 'far fa-star text-gray-300 text-xs mr-0.5'
                                  }
                                  style={{ fontSize: '0.75rem' }}
                                ></i>
                              ))}
                            </div>
                          </div>
                        </div>
                        <motion.p 
                          className="text-gray-700 dark:text-gray-200 mb-4 italic"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          "{testimonial.quote}"
                        </motion.p>
                        <motion.div 
                          className="text-2xl font-bold text-purple-600 dark:text-purple-300"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          {testimonial.result}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Carousel indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center mt-8 space-x-2"
          >
            {[...Array(Math.ceil((testimonials.length || 1) / 3))].map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-purple-300 dark:bg-purple-600 animate-pulse"
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 sm:py-20 gradient-purple text-white w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-2">
              How Our System Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-2xl mx-auto px-2">
              Three simple steps to transform your content into qualified sales calls
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12"
          >
            {processSteps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center group">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
                  <CardContent className="p-8">
                    <div className="mb-4 sm:mb-6">
                      <step.icon className="h-12 sm:h-16 w-12 sm:w-16 text-purple-300 mb-3 sm:mb-4 mx-auto" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-white px-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-purple-100 leading-relaxed px-2">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12 sm:mt-16"
          >
            <Button 
              onClick={() => scrollToSection('calendly')}
              size="lg"
              variant="secondary"
              className="bg-white text-purple-800 hover:bg-purple-50 rounded-full transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base px-4 sm:px-6"
            >
              <Rocket className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
              <span className="hidden sm:inline">Start Your Content Funnel Today</span>
              <span className="sm:hidden">Start Today</span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 w-full overflow-hidden">
  {/* Light mode right-side gradient */}

  <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 text-center relative z-10">
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-2"
    >
      Ready to Fill Your Calendar With{' '}
      <span className="text-gradient-purple">Qualified Leads?</span>
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-2"
    >
      Stop chasing prospects. Let our proven content funnel system bring pre-qualified coaching clients directly to your calendar.
    </motion.p>
   <motion.ul
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
  className="grid grid-cols-2 sm:flex sm:flex-row justify-center items-center justify-items-center gap-4 sm:gap-8 mt-10 mb-10 text-left"
>
  {/* First Feature */}
  <motion.li
    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
    className="flex items-center gap-2 sm:gap-4"
  >
    <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 text-white shadow-xl border-2 border-white dark:border-gray-700 p-2 sm:p-3">
      <i className="fas fa-calendar-check fa-lg sm:text-lg"></i>
    </span>
    <span className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
      <span className="sm:hidden">Pick a time</span>
      <span className="hidden sm:inline">Pick a time that works for you</span>
    </span>
  </motion.li>
  {/* Second Feature */}
  <motion.li
    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
    className="flex items-center gap-2 sm:gap-4"
  >
    <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 text-white shadow-xl border-2 border-white dark:border-gray-700 p-2 sm:p-3">
      <i className="fas fa-comments fa-lg sm:text-lg"></i>
    </span>
    <span className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
      <span className="sm:hidden">Strategy session</span>
      <span className="hidden sm:inline">Get a personalized strategy session</span>
    </span>
  </motion.li>
  {/* Third Feature, centered below */}
  <motion.li
    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
    className="flex items-center gap-2 sm:gap-4 col-span-2 justify-self-center"
  >
    <span className="relative inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 text-white shadow-xl border-2 border-white dark:border-gray-700 p-2 sm:p-3">
      <i className="fas fa-bullseye fa-lg sm:text-lg"></i>
    </span>
    <span className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
      <span className="sm:hidden">Actionable steps</span>
      <span className="hidden sm:inline">Walk away with actionable next steps</span>
    </span>
  </motion.li>
</motion.ul>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="mt-6 text-purple-700 dark:text-purple-300 italic text-lg font-semibold mb-4"
    >
      No sales pitch. No obligation. Just value.
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.7 }}
    >
      <Button
        onClick={() => scrollToSection('calendly')}
        size="lg"
        className="gradient-purple text-white rounded-full hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-7"
      >
        <Calendar className="mr-2 sm:mr-3 md:mr-4 h-5 sm:h-6 w-5 sm:w-6" />
        <span className="hidden sm:inline">Book Your Free Discovery Call Now</span>
        <span className="sm:hidden">Book Free Call</span>
      </Button>
    </motion.div>
  </div>
</section>
      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-white dark:bg-gray-800 w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Mobile: Title first, then image, then content */}
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 px-2">
                Meet Your Content Funnel Expert
              </h2>
              <img 
               src={proImage}
                alt="Content marketing professional working on laptop" 
                className="rounded-full w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 object-cover mx-auto shadow-xl sm:shadow-2xl border-4 sm:border-6 md:border-8 border-purple-100 dark:border-purple-600 mb-6 sm:mb-8" 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-lg text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
                <p>
                  I'm Alex Martinez, and I've spent the last 7 years helping coaches and info product creators transform their content into predictable revenue streams.
                </p>
                <p>
                  After building content funnels for over 200+ coaches, I discovered the exact formula that turns educational content into qualified sales calls. My clients consistently see 300-500% increases in discovery calls within 90 days.
                </p>
                <p className="font-semibold text-purple-700 dark:text-purple-300">
                  The secret? Strategic content that pre-qualifies and nurtures prospects before they even book a call with you.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <div className="bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-full">
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">7+ Years Experience</span>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-full">
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">200+ Coaches Helped</span>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-full">
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">$2M+ Revenue Generated</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Desktop: Side by side layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo on LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <img 
                src={proImage}
                alt="Content marketing professional working on laptop" 
                className="rounded-full w-80 h-80 object-cover mx-auto shadow-2xl border-8 border-purple-100 dark:border-purple-600" 
              />
            </motion.div>
            
            {/* Text content on RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Your Content Funnel Expert
              </h2>
              <div className="text-lg text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
                <p>
                 I’m Prakhyat Gupta, founder of Leadforgee. I help info creators turn their skills into successful businesses. I noticed many talented people have great offers but struggle to find the right audience or get enough sales calls. That’s why I started my agency.
                </p>
                <p>
                  With my fully done for you content creation service, all you need to do is record your content and I’ll handle scripting, editing, thumbnails, posting and everything in between. I believe luck doesn’t exist, showing up every day is how you make your own. I’m here to make growing your business simple and stress free.
                </p>
                <p className="font-semibold text-purple-700 dark:text-purple-300">
                  The secret? Strategic content that pre-qualifies and nurtures prospects before they even book a call with you.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-full">
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">3 years+ Experience</span>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-full">
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">15+ coaches helped</span>
                </div>
              
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section id="calendly" className="py-16 sm:py-20 gradient-purple w-full overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-2">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 px-2">
              Book Your Free Discovery Call
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-2xl mx-auto px-2">
              Let's discuss how our content funnel system can transform your coaching business in the next 90 days.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="bg-white dark:bg-gray-700 shadow-xl sm:shadow-2xl overflow-hidden w-full">
              <CardContent className="p-2 sm:p-6 md:p-4">
                
                
                {/* Calendly Inline Widget */}
                <div className="w-full h-80 sm:h-100 md:h-[800px] mb-2 sm:mb-6">
                  <div
                    id="calendly-container"
                    className="w-full h-full rounded-lg sm:rounded-xl"
                    style={{ minWidth: "320px", height: "100%" }}
                  >
                    {/* Loading fallback will be handled in the effect */}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center">
  <div className="flex items-center justify-center">
    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400 mr-1 sm:mr-2" />
    <span className="text-xs sm:text-base text-gray-700 dark:text-gray-300 font-medium">30 Minutes</span>
  </div>
  <div className="flex items-center justify-center">
    <Video className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400 mr-1 sm:mr-2" />
    <span className="text-xs sm:text-base text-gray-700 dark:text-gray-300 font-medium">Zoom Call</span>
  </div>
  <div className="flex items-center justify-center">
    <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400 mr-1 sm:mr-2" />
    <span className="text-xs sm:text-base text-gray-700 dark:text-gray-300 font-medium">Completely Free</span>
  </div>
</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 w-full overflow-hidden">
  <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-bold mb-2">Contact Information</h3>
        <div className="mb-2">
          <span className="font-semibold">Our Location:</span>
          <div className="text-gray-300">Navab Gate, Rampur, India</div>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Phone Number:</span>
          <div className="text-gray-300">+91 9621005823</div>
        </div>
        <div>
          <span className="font-semibold">Email Address:</span>
          <div className="text-gray-300">info@leadforgee.com</div>
        </div>
      </div>
      {/* Social Media */}
      <div className="flex flex-col items-center md:items-start">
        <h3 className="text-lg font-bold mb-2">Connect with us</h3>
        <div className="flex space-x-5 mt-2">
          <a href="https://www.linkedin.com/in/prakhyat-gupta-b1622a320/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin text-2xl hover:text-purple-400 transition"></i>
          </a>
          <a href="https://x.com/Leadforgee" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
            <i className="fab fa-x-twitter text-2xl hover:text-purple-400 transition"></i>
          </a>
          <a href="https://www.instagram.com/leadforgee/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram text-2xl hover:text-purple-400 transition"></i>
          </a>
        </div>
      </div>
      {/* Brand/Description */}
      <div className="flex flex-col items-center md:items-start">
        <h3 className="text-xl font-bold text-gradient-purple mb-3">LeadForgee</h3>
        <p className="text-sm text-gray-400 mb-4 max-w-xs">
          Helping coaches and info product creators transform their content into predictable sales calls through proven funnel systems.
        </p>
      </div>
    </div>
    <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
      <p className="text-gray-400 text-xs sm:text-sm px-2">
        © 2025 LeadForgee. All rights reserved. | Privacy Policy | Terms of Service
      </p>
    </div>
  </div>
</footer>
    </div>
  );
}
