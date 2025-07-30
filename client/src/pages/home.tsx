import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Settings, Bot, Calendar, CalendarCheck, Clock, Video, Gift, Rocket, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Coach",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b692?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      quote: "Went from 2 calls per month to 15+ qualified calls. My calendar is booked solid with ideal clients!",
      result: "650% increase in sales calls"
    },
    {
      name: "Mike Rodriguez",
      role: "Life Coach",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      quote: "The content funnel brought me 12 new clients in just 8 weeks. ROI was incredible!",
      result: "$47K revenue in 2 months"
    },
    {
      name: "Lisa Chen",
      role: "Executive Coach",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      quote: "Finally stopped chasing clients. Now they come to me pre-sold and ready to invest!",
      result: "90% close rate on calls"
    },
    {
      name: "David Thompson",
      role: "Mindset Coach",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      quote: "Content funnel system doubled my monthly revenue in just 10 weeks. Game changer!",
      result: "200% revenue increase"
    },
    {
      name: "Emma Wilson",
      role: "Health Coach",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      quote: "Automated lead generation freed up 15 hours per week. Now I focus purely on coaching!",
      result: "15 hours saved weekly"
    },
    {
      name: "James Parker",
      role: "Career Coach",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      quote: "From zero to 25 discovery calls per month. The content funnels work like magic!",
      result: "25 calls per month"
    }
  ];

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
      <nav className="fixed top-0 left-0 right-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-purple-100 dark:border-purple-800">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient-purple truncate">
                ContentToCalls
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
                className="gradient-purple text-white hover:opacity-90 transition-all transform hover:scale-105 text-xs sm:text-sm px-3 sm:px-4 py-2 whitespace-nowrap"
              >
                Book Call
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-16 sm:pb-20 w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-2">
                Turn Content Into{" "}
                <span className="text-gradient-purple">
                  Sales Calls
                </span>
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl">On Autopilot</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-2">
                We bring qualified leads to your calendar using high-converting content funnels.{" "}
                <strong className="text-purple-700 dark:text-purple-300">You focus on coaching, we handle the rest.</strong>
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <Button 
                onClick={() => scrollToSection('calendly')}
                size="lg"
                className="gradient-purple text-white hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4"
              >
                <CalendarCheck className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                <span className="hidden sm:inline">Book a Free Discovery Call</span>
                <span className="sm:hidden">Book Free Call</span>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
              className="mt-12 sm:mt-16 px-2"
            >
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
                alt="Professional coaches and consultants in a modern office setting" 
                className="rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl mx-auto max-w-full w-full" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-16 sm:py-20 bg-white dark:bg-gray-800 w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-purple-600 dark:via-purple-500 dark:to-purple-700 dark:bg-clip-text dark:text-transparent mb-4 px-2">
              Real Results From Real Coaches
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:bg-gradient-to-r dark:from-purple-600 dark:via-purple-500 dark:to-purple-700 dark:bg-clip-text dark:text-transparent max-w-2xl mx-auto px-2">
              See how our content funnel system transformed their businesses
            </p>
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
              {testimonials.map((testimonial, index) => (
                <div key={index} className="embla__slide">
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
                    <Card className="gradient-purple-light dark:metallic-card-dark border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full transform hover:-translate-y-1">
                      <CardContent className="p-8">
                        <div className="flex items-center mb-6">
                          <motion.img 
                            src={testimonial.image} 
                            alt={`${testimonial.name} testimonial portrait`} 
                            className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-purple-200 dark:border-purple-400" 
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                            <p className="text-purple-600 dark:text-purple-300 font-medium">{testimonial.role}</p>
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
            {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
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
              className="bg-white text-purple-800 hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base px-4 sm:px-6"
            >
              <Rocket className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
              <span className="hidden sm:inline">Start Your Content Funnel Today</span>
              <span className="sm:hidden">Start Today</span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 w-full overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-2">
              Ready to Fill Your Calendar With{" "}
              <span className="text-gradient-purple">
                Qualified Leads?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
              Stop chasing prospects. Let our proven content funnel system bring pre-qualified coaching clients directly to your calendar.
            </p>
            
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
              alt="Professional business meeting with sales call discussion" 
              className="rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl mx-auto mb-8 sm:mb-12 w-full" 
            />
            
            <Button 
              onClick={() => scrollToSection('calendly')}
              size="lg"
              className="gradient-purple text-white hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5"
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
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
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
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
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
                  I'm Alex Martinez, and I've spent the last 7 years helping coaches and info product creators transform their content into predictable revenue streams.
                </p>
                <p>
                  After building content funnels for over 200+ coaches, I discovered the exact formula that turns educational content into qualified sales calls. My clients consistently see 300-500% increases in discovery calls within 90 days.
                </p>
                <p className="font-semibold text-purple-700 dark:text-purple-300">
                  The secret? Strategic content that pre-qualifies and nurtures prospects before they even book a call with you.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
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
        </div>
      </section>

      {/* Calendly Section */}
      <section id="calendly" className="py-16 sm:py-20 gradient-purple w-full overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
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
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 px-2">Schedule Your Free 30-Minute Strategy Session</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-2">No pitch, no pressure - just a genuine strategy session about your content and lead generation goals.</p>
                </div>
                
                {/* Calendly iframe */}
                <div className="w-full h-80 sm:h-96 md:h-[500px] mb-6 sm:mb-8">
                  <iframe
                    src="https://calendly.com/your-calendly-link"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Schedule a meeting"
                    className="rounded-lg sm:rounded-xl w-full"
                  ></iframe>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">30 Minutes</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Video className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">Zoom Call</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Gift className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">Completely Free</span>
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
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-purple mb-3 sm:mb-4">
              ContentToCalls
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Helping coaches and info product creators transform their content into predictable sales calls through proven funnel systems.
            </p>
            
            <div className="border-t border-gray-800 pt-6 sm:pt-8">
              <p className="text-gray-400 text-xs sm:text-sm px-2">
                © 2024 ContentToCalls. All rights reserved. | Privacy Policy | Terms of Service
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
