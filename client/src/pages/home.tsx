import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Settings, Bot, Calendar, CalendarCheck, Clock, Video, Gift, Rocket, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gradient-purple">
                ContentToCalls
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('process')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                About
              </button>
            </div>
            <Button 
              onClick={() => scrollToSection('calendly')}
              className="gradient-purple text-white hover:opacity-90 transition-all transform hover:scale-105"
            >
              Book Free Call
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Turn Content Into{" "}
                <span className="text-gradient-purple">
                  Sales Calls
                </span>
                <br />
                <span className="text-4xl md:text-6xl">On Autopilot</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                We bring qualified leads to your calendar using high-converting content funnels.{" "}
                <strong className="text-purple-700">You focus on coaching, we handle the rest.</strong>
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
                className="gradient-purple text-white hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg px-8 py-4"
              >
                <CalendarCheck className="mr-3 h-5 w-5" />
                Book a Free Discovery Call
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
              className="mt-16"
            >
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
                alt="Professional coaches and consultants in a modern office setting" 
                className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Real Results From Real Coaches
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our content funnel system transformed their businesses
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="gradient-purple-light border-purple-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.name} testimonial portrait`} 
                        className="w-16 h-16 rounded-full object-cover mr-4" 
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-purple-600 font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="text-2xl font-bold text-purple-600">{testimonial.result}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 gradient-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How Our System Works
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Three simple steps to transform your content into qualified sales calls
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12"
          >
            {processSteps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center group">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <step.icon className="h-16 w-16 text-purple-300 mb-4 mx-auto" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                    <p className="text-purple-100 leading-relaxed">
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
            className="text-center mt-16"
          >
            <Button 
              onClick={() => scrollToSection('calendly')}
              size="lg"
              variant="secondary"
              className="bg-white text-purple-800 hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <Rocket className="mr-3 h-5 w-5" />
              Start Your Content Funnel Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Fill Your Calendar With{" "}
              <span className="text-gradient-purple">
                Qualified Leads?
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Stop chasing prospects. Let our proven content funnel system bring pre-qualified coaching clients directly to your calendar.
            </p>
            
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
              alt="Professional business meeting with sales call discussion" 
              className="rounded-2xl shadow-xl mx-auto mb-12 max-w-4xl w-full" 
            />
            
            <Button 
              onClick={() => scrollToSection('calendly')}
              size="lg"
              className="gradient-purple text-white hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-xl px-10 py-5"
            >
              <Calendar className="mr-4 h-6 w-6" />
              Book Your Free Discovery Call Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                className="rounded-full w-80 h-80 object-cover mx-auto shadow-2xl border-8 border-purple-100" 
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Meet Your Content Funnel Expert
              </h2>
              <div className="text-lg text-gray-600 space-y-6 leading-relaxed">
                <p>
                  I'm Alex Martinez, and I've spent the last 7 years helping coaches and info product creators transform their content into predictable revenue streams.
                </p>
                <p>
                  After building content funnels for over 200+ coaches, I discovered the exact formula that turns educational content into qualified sales calls. My clients consistently see 300-500% increases in discovery calls within 90 days.
                </p>
                <p className="font-semibold text-purple-700">
                  The secret? Strategic content that pre-qualifies and nurtures prospects before they even book a call with you.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-purple-50 px-4 py-2 rounded-full">
                  <span className="text-purple-700 font-semibold">7+ Years Experience</span>
                </div>
                <div className="bg-purple-50 px-4 py-2 rounded-full">
                  <span className="text-purple-700 font-semibold">200+ Coaches Helped</span>
                </div>
                <div className="bg-purple-50 px-4 py-2 rounded-full">
                  <span className="text-purple-700 font-semibold">$2M+ Revenue Generated</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section id="calendly" className="py-20 gradient-purple">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your Free Discovery Call
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Let's discuss how our content funnel system can transform your coaching business in the next 90 days.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="bg-white shadow-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule Your Free 30-Minute Strategy Session</h3>
                  <p className="text-gray-600">No pitch, no pressure - just a genuine strategy session about your content and lead generation goals.</p>
                </div>
                
                {/* Calendly iframe */}
                <div className="w-full h-96 mb-8">
                  <iframe
                    src="https://calendly.com/your-calendly-link"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Schedule a meeting"
                    className="rounded-xl"
                  ></iframe>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="text-gray-700 font-medium">30 Minutes</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Video className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="text-gray-700 font-medium">Zoom Call</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Gift className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="text-gray-700 font-medium">Completely Free</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gradient-purple mb-4">
              ContentToCalls
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Helping coaches and info product creators transform their content into predictable sales calls through proven funnel systems.
            </p>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-sm">
                © 2024 ContentToCalls. All rights reserved. | Privacy Policy | Terms of Service
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
