import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Settings, Bot, Calendar, CalendarCheck, Clock, Video, Gift, Rocket, ExternalLink, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import logoPath from '@/assets/logo.png';
import proImage from '@/assets/profile.png';
// Removed Next.js Image component; using native <img /> with Vite.

const faqItems = [
  {
    question: "Do I need to have a big audience for this to work?",
    answer:
      "No. We have worked with coaches who had under 1,000 followers and still generated consistent sales calls through their content. Audience size is not the problem, authority and strategy are.",
  },
  {
    question: "What do I actually have to do on my end?",
    answer:
      "Just record yourself. We handle the scripting, editing, thumbnails, captions, posting and everything in between. Your only job is to show up on camera.",
  },
  {
    question: "How long before I start seeing results?",
    answer:
      "Most clients start seeing meaningful engagement and inbound interest within the first 60 to 90 days. Content is a compounding asset — the earlier you start the faster it builds.",
  },
  {
    question: "Do you work with coaches in any niche?",
    answer:
      "We work exclusively with coaches and consultants. If you are in that space we can almost certainly help you regardless of your specific niche.",
  },
  {
    question: "What if I have tried content before and it did not work?",
    answer:
      "That is exactly why we exist. Most coaches who have tried content before were either inconsistent, had no real strategy, or were producing content that looked amateur. We fix all three.",
  },
  {
    question: "Is there a contract?",
    answer:
      "No long term contracts. We work on a monthly basis because we believe our results should be reason enough to stay.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) =>
    setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 w-full overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
    >
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-purple-300 via-pink-200 to-purple-400 dark:from-purple-900 dark:via-pink-900 dark:to-purple-700" />
      </div>

      <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 tracking-wide uppercase">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Frequently Asked{" "}
            <span className="text-gradient-purple dark:bg-gradient-to-r dark:from-purple-300 dark:via-purple-400 dark:to-purple-500 dark:bg-clip-text dark:text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Everything you need to know before taking the next step.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="space-y-3"
        >
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-purple-400 dark:border-purple-500 shadow-lg shadow-purple-100/60 dark:shadow-purple-900/40 bg-white dark:bg-gray-800"
                    : "border-purple-100 dark:border-gray-700 bg-white/70 dark:bg-gray-800/60 hover:border-purple-300 dark:hover:border-purple-600"
                } backdrop-blur-sm`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-200 ${
                      isOpen
                        ? "text-purple-700 dark:text-purple-300"
                        : "text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                      isOpen
                        ? "bg-purple-600 text-white rotate-180"
                        : "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-800"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {/* Animated answer */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-5">
            Still have questions?{" "}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              We would love to chat.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

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
  const [, navigate] = useLocation();

  const autoplayRef = useRef(Autoplay({
    delay: 4000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  }));

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [autoplayRef.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const hoveringRef = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect as any);
    };
  }, [emblaApi]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Ensure autoplay starts once Embla and plugin are ready
  useEffect(() => {
    if (!emblaApi) return;
    const id = window.setTimeout(() => {
      autoplayRef.current?.play?.();
    }, 0);
    return () => window.clearTimeout(id);
  }, [emblaApi]);



  const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const yOffset = -44; // Adjust this to your navbar height (in px)
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

  // NOTE: Replaced dynamic testimonials fetching with static embeds per request.
  // const [testimonials, setTestimonials] = useState<any[]>([]);
  // const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  // useEffect(() => {
  //   const fetchTestimonials = async () => {
  //     try {
  //       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/testimonial/active`);
  //       if (!res.ok) throw new Error('Failed to fetch testimonials');
  //       const data = await res.json();
  //       setTestimonials(data);
  //     } catch (err) {
  //       setTestimonials([]);
  //     } finally {
  //       setLoadingTestimonials(false);
  //     }
  //   };
  //   fetchTestimonials();
  // }, []);

  // Video testimonials: 3 YouTube Shorts with titles and descriptions
  const videoTestimonials = [
    
    {
      id: 'e3os2eEa7ZE',
      
      title: 'Neal Brice – Co-owner, Augra Media',
      description:
        'With an audience of over 50k followers, Neal partnered with us to sharpen his growth strategy and take Augra Media’s presence to the next level.',
    },
    {
      id: '_32X6Fsqxd8',
      title: 'Adi – Founder, Mukon Digital',
      description:
        'Adi trusted us to support Mukon Digital’s expansion. Together, we’ve built stronger systems that attract the right clients consistently.',
    },
    {
      id: 'sK4JE2oWbE8',
      title: 'Kevin – Patio Cooking Channel',
      description:
        "We launched Kevin’s Patio channel from scratch, starting at zero. In just a short time, he’s crossed 33,000+ views, 315 hours of watch time, and built momentum with his cooking content.",
    }
  ];

  const slideCount = videoTestimonials.length;

  // Pause autoplay when any video starts playing (YouTube Iframe API)
  const playersRef = useRef<any[]>([]);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ensureApi = () =>
      new Promise<void>((resolve) => {
        if ((window as any).YT && (window as any).YT.Player) return resolve();
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        document.body.appendChild(tag);
        (window as any).onYouTubeIframeAPIReady = () => resolve();
      });

    let cancelled = false;
    ensureApi().then(() => {
      if (cancelled) return;
      playersRef.current = videoTestimonials.map((_, idx) => {
        const player = new (window as any).YT.Player(`yt-player-${idx}`, {
          events: {
            onStateChange: (e: any) => {
              const YT = (window as any).YT;
              if (e.data === YT.PlayerState.PLAYING) {
                autoplayRef.current?.stop?.();
              } else if (
                e.data === YT.PlayerState.PAUSED ||
                e.data === YT.PlayerState.ENDED
              ) {
                if (!hoveringRef.current) autoplayRef.current?.play?.();
              }
            },
          },
        });
        return player;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [videoTestimonials]);

  const processSteps = [
    {
      icon: Search,
      title: "1. Content Strategy Audit",
      description: "We analyze your current content and identify gaps, then create a strategic content plan designed to attract your ideal coaching clients."
    },
    {
      icon: Settings,
      title: "2. Done For You Content Production",
      description: "We handle everything from scripting and editing to graphics and captions. You review, approve, and we publish. No back and forth, no bottlenecks."
    },
    {
      icon: Bot,
      title: "3. Consistent Publishing and Growth",
      description: "We keep your content going out on a schedule, week after week, so your audience grows and your ideal clients start seeing you as the obvious choice."
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-purple-100 dark:border-gray-900">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center min-w-0">
              <img src={logoPath} alt="Leadforgee Logo" width={32} height={32} className="h-8 md:h-8 mr-2" />
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
                onClick={() => navigate('/apply')}
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
              
                Done For You Content That Makes You Look Like The{" "}
                <span className="text-gradient-purple dark:bg-gradient-to-r dark:from-purple-300 dark:via-purple-400 dark:to-purple-500 dark:bg-clip-text dark:text-transparent">Expert You Actually Are.</span>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="flex flex-col items-center gap-2 mb-2"
            >
              <Button 
                onClick={() => navigate('/apply')}
                size="lg"
                variant="secondary"
                className="bg-white text-purple-800 border border-purple-200 hover:bg-purple-50 rounded-full transition-all transform hover:scale-105 shadow text-base sm:text-lg lg:text-xl px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6"
              >
                <CalendarCheck className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6" />
                <span className="hidden sm:inline">Book a Free Discovery Call</span>
                <span className="sm:hidden">Book Free Call</span>
              </Button>
              <div className="mt-4">
                <Button
                  onClick={() => scrollToSection('process')}
                  size="lg"
                  className="gradient-purple text-white rounded-full hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4"
                >
                  How it Works
                </Button>
              </div>
            </motion.div>
            
            
            <motion.div
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
  className="mt-12 px-2"
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
        {/* Testimonials Section */}
<section id="testimonials" className="py-20 px-4 bg-black">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        What Our Clients Say
      </h2>
      <p className="text-gray-400 text-lg max-w-xl mx-auto">
        Real results from real people who trusted us with their content.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Testimonial 1 - Patricia */}
      <div className="bg-[#0f0f0f] border border-purple-900/40 rounded-2xl p-6 flex flex-col gap-4 hover:border-purple-600/60 transition-colors duration-300">
        <div className="flex gap-1 text-purple-400 text-lg">
          {"★★★★★"}
        </div>
        <p className="text-gray-300 text-sm leading-relaxed flex-1">
          "Prakhyat Gupta, Founder of Leadforgee, delivers a clear and structured approach to lead generation. His short assessments are precise, actionable, and easy to implement. His professional collaboration, reliable communication, and consistent support define the experience. A strong partner for organisations focusing on measurable growth in client acquisition."
        </p>
        <div className="pt-2 border-t border-purple-900/30">
          <p className="text-white font-semibold text-sm">Patricia Mösch</p>
          <p className="text-purple-400 text-xs mt-0.5">CEO, Decision Coach for Executives & HR</p>
        </div>
      </div>

      {/* Testimonial 2 - Justin */}
      <div className="bg-[#0f0f0f] border border-purple-900/40 rounded-2xl p-6 flex flex-col gap-4 hover:border-purple-600/60 transition-colors duration-300">
        <div className="flex gap-1 text-purple-400 text-lg">
          {"★★★★★"}
        </div>
        <p className="text-gray-300 text-sm leading-relaxed flex-1">
          "Working with Prakhyat has been a great experience. He's incredibly patient with all my edit requests, always brings a sharp creative eye to my videos, and consistently makes them better. On top of that, he's super prompt and reliable, which makes the entire process smooth and stress-free. Highly recommended!"
        </p>
        <div className="pt-2 border-t border-purple-900/30">
          <p className="text-white font-semibold text-sm">Justin Moore</p>
          <p className="text-purple-400 text-xs mt-0.5">Sponsorship Coach, Creator Wizard</p>
        </div>
      </div>

      {/* Testimonial 3 - Augra Media */}
      <div className="bg-[#0f0f0f] border border-purple-900/40 rounded-2xl p-6 flex flex-col gap-4 hover:border-purple-600/60 transition-colors duration-300">
        <div className="flex gap-1 text-purple-400 text-lg">
          {"★★★★★"}
        </div>
        <p className="text-gray-300 text-sm leading-relaxed flex-1">
          "He really just helps our company scale because he takes care of the whole backend processes. He handles all the editing, all the staffing and all the management. It is very easy for me to focus on the business when he is taking care of everything in the back. He takes a lot off your shoulders, which you really need if you want to scale your business."
        </p>
        <div className="pt-2 border-t border-purple-900/30">
          <p className="text-white font-semibold text-sm">Co-Founder, Augra Media</p>
          <p className="text-purple-400 text-xs mt-0.5">Agency Co-Founder</p>
        </div>
      </div>

    </div>
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
              onClick={() => navigate('/apply')}
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
      transition={{ duration: 0.7, delay: 0.7 }}
    >
      <Button
        onClick={() => navigate('/apply')}
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
                Meet the Team Behind Your Content
              </h2>
              <img
                src={proImage}
                alt="Content marketing professional working on laptop"
                width={256}
                height={256}
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
                  I'm Prakhyat Gupta, founder of Leadforgee. I work exclusively with coaches and consultants who are incredible at what they do but are invisible online because their content doesn't reflect their expertise.
                </p>
                <p>
                  I started Leadforgee because I kept watching talented coaches lose clients to people who were simply better at showing up online.
                </p>
                <p>
                  Our team handles everything from scripting to editing to publishing so you can stay focused on coaching while your brand finally starts working for you.
                </p>
                <p>
                  We've helped coaches go from posting inconsistently with little traction to generating over a million views, thousands of new followers, and a steady stream of inbound leads, all without them lifting a finger on content.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <div className="bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-full">
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">8.4M+ Views Generated</span>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-full">
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">20+ Clients Served</span>
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
                width={320}
                height={320}
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
                Meet the Team Behind Your Content
              </h2>
              <div className="text-lg text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
                <p>
                  I'm Prakhyat Gupta, founder of Leadforgee. I work exclusively with coaches and consultants who are incredible at what they do but are invisible online because their content doesn't reflect their expertise.
                </p>
                <p>
                  I started Leadforgee because I kept watching talented coaches lose clients to people who were simply better at showing up online.
                </p>
                <p>
                  Our team handles everything from scripting to editing to publishing so you can stay focused on coaching while your brand finally starts working for you.
                </p>
                <p>
                  We've helped coaches go from posting inconsistently with little traction to generating over a million views, thousands of new followers, and a steady stream of inbound leads, all without them lifting a finger on content.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-full">
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">8.4M+ Views Generated</span>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-full">
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">20+ Clients Served</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-gray-950 text-white w-full overflow-hidden border-t border-gray-800">
        {/* Top gradient accent */}
        <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

            {/* Col 1 – Brand */}
            <div>
              <div className="flex items-center mb-4">
                <img src={logoPath} alt="LeadForgee" className="h-7 w-7 mr-2" />
                <span className="text-xl font-bold text-gradient-purple">LeadForgee</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                We turn your expertise into content that attracts high-intent leads and books qualified sales calls — on autopilot.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-4">
                <a href="mailto:info@leadforgee.com" aria-label="Email" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <i className="fas fa-envelope text-lg" />
                </a>
                <a href="https://www.linkedin.com/in/prakhyat-gupta-b1622a320/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <i className="fab fa-linkedin text-lg" />
                </a>
                <a href="https://x.com/Leadforgee" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <i className="fab fa-x-twitter text-lg" />
                </a>
                <a href="https://www.instagram.com/prakhyatguptaa_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <i className="fab fa-instagram text-lg" />
                </a>
              </div>
            </div>

            {/* Col 2 – Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-5">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => scrollToSection('process')} className="text-gray-400 underline underline-offset-4 decoration-gray-600 hover:text-white hover:decoration-purple-400 transition-colors duration-200">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('testimonials')} className="text-gray-400 underline underline-offset-4 decoration-gray-600 hover:text-white hover:decoration-purple-400 transition-colors duration-200">
                    Testimonials
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-gray-400 underline underline-offset-4 decoration-gray-600 hover:text-white hover:decoration-purple-400 transition-colors duration-200">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('book')} className="text-gray-400 underline underline-offset-4 decoration-gray-600 hover:text-white hover:decoration-purple-400 transition-colors duration-200">
                    Book a Call
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3 – Contact */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-5">Get In Touch</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <a href="mailto:info@leadforgee.com" className="flex items-center gap-3 hover:text-white transition-colors duration-200 group">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-900/50 group-hover:bg-purple-700/60 transition-colors">
                      <i className="fas fa-envelope text-purple-400 text-xs" />
                    </span>
                    info@leadforgee.com
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/prakhyatguptaa_/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors duration-200 group">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-900/50 group-hover:bg-purple-700/60 transition-colors">
                      <i className="fab fa-instagram text-purple-400 text-xs" />
                    </span>
                    @prakhyatguptaa_
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/prakhyat-gupta-b1622a320/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors duration-200 group">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-900/50 group-hover:bg-purple-700/60 transition-colors">
                      <i className="fab fa-linkedin text-purple-400 text-xs" />
                    </span>
                    Prakhyat Gupta
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} LeadForgee. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-gray-700">|</span>
              <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
