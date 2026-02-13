import { useEffect, useState, useRef } from 'react'
import './App.css'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  BarChart3, 
  Brain, 
  ChevronRight, 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Search,
  Bot,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Globe,
  Database,
  ChevronDown,
  Menu,
  X,
  Quote,
  Clock,
  Users,
  FileText,
  Award
} from 'lucide-react'

// ============================================
// DATA & CONFIGURATION
// ============================================

const sections = [
  { id: 'hero', label: 'Overview', shortLabel: 'Start' },
  { id: 'science', label: 'The Science', shortLabel: 'Science' },
  { id: 'landscape', label: 'AI Landscape', shortLabel: 'Landscape' },
  { id: 'strategies', label: 'Strategies', shortLabel: 'Tactics' },
  { id: 'implementation', label: 'Implementation', shortLabel: 'Action' },
  { id: 'future', label: 'Future', shortLabel: 'Future' },
]

const stats = [
  { 
    value: '527%', 
    suffix: '',
    label: 'Increase in AI-referred sessions', 
    period: 'Jan-May 2025',
    source: 'Previsible 2025 AI Traffic Report',
    icon: TrendingUp 
  },
  { 
    value: '43', 
    suffix: '%',
    label: 'Of professionals use ChatGPT for work', 
    period: 'Daily active users',
    source: 'Glassdoor/Fishbowl Study',
    icon: Users 
  },
  { 
    value: '500', 
    suffix: 'M+',
    label: 'Monthly queries on Perplexity', 
    period: 'Growing rapidly',
    source: 'Index.dev',
    icon: Search 
  },
  { 
    value: '40', 
    suffix: '%',
    label: 'Visibility increase with GEO', 
    period: 'Proven strategies',
    source: 'Princeton/Georgia Tech Research',
    icon: BarChart3 
  },
]

const strategies = [
  {
    title: 'Structure for Clarity',
    shortDesc: 'Clear headings, summaries, and bullet points help AI extraction.',
    fullDesc: 'AI systems extract content more effectively when it\'s well-structured. Use clear H2/H3 headings, include summary sections, and format with bullet points.',
    impact: 'High Impact',
    tips: ['Use H2/H3 tags logically', 'Include summary sections', 'Format with bullet points', 'Add "key takeaways" boxes'],
    icon: Target,
  },
  {
    title: 'Demonstrate Authority',
    shortDesc: 'Build E-E-A-T signals through author bios and citations.',
    fullDesc: 'Build E-E-A-T signals through author bios, citations, and established expertise in topical domains. Authority signals are heavily weighted by AI systems.',
    impact: 'High Impact',
    tips: ['Include author credentials', 'Cite authoritative sources', 'Show first-hand experience', 'Link to expert profiles'],
    icon: Award,
  },
  {
    title: 'Semantic Richness',
    shortDesc: 'Move beyond keywords. Focus on meaning and context.',
    fullDesc: 'Move beyond keywords. Focus on meaning, context, and comprehensive coverage of topics. AI understands semantic relationships between concepts.',
    impact: 'High Impact',
    tips: ['Cover topics comprehensively', 'Use natural language', 'Include related concepts', 'Answer follow-up questions'],
    icon: Brain,
  },
  {
    title: 'Fresh Content',
    shortDesc: 'Regularly update content, especially for time-sensitive topics.',
    fullDesc: 'Regularly update content, especially for time-sensitive topics. AI favors recent publications and actively seeks the most current information.',
    impact: 'Medium Impact',
    tips: ['Update articles quarterly', 'Publish date prominently', 'Cover trending topics', 'Refresh statistics annually'],
    icon: Clock,
  },
  {
    title: 'Unique Data & Insights',
    shortDesc: 'Original research and unique perspectives are highly valued.',
    fullDesc: 'Original research, statistics, and unique perspectives are highly valued by AI systems. First-party data distinguishes your content.',
    impact: 'Medium Impact',
    tips: ['Conduct original research', 'Share proprietary data', 'Offer unique analysis', 'Publish case studies'],
    icon: Database,
  },
  {
    title: 'Conversational Language',
    shortDesc: 'Write naturally to match how users query AI systems.',
    fullDesc: 'Write in natural, conversational language that matches how users query AI systems. Direct answers to specific questions perform better.',
    impact: 'Medium Impact',
    tips: ['Answer specific questions', 'Use natural phrasing', 'Address user intent directly', 'Include FAQ sections'],
    icon: FileText,
  },
]

const platforms = [
  { 
    name: 'ChatGPT', 
    color: '#10a37f',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    description: 'The market leader with 200M+ weekly users',
    citation: 'Cites Wikipedia 47.9% of the time',
    strategy: 'Focus on comprehensive, educational content with clear citations.',
    icon: Bot
  },
  { 
    name: 'Perplexity', 
    color: '#22d3ee',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    description: 'AI-native search with 500M+ monthly queries',
    citation: 'Skews toward Reddit (46.7% of sources)',
    strategy: 'Prioritize real-time info and community-driven content.',
    icon: Search
  },
  { 
    name: 'Google Gemini', 
    color: '#3b82f6',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    description: 'Integrated across Google\'s ecosystem',
    citation: 'Emphasizes entity understanding',
    strategy: 'Maintain SEO fundamentals alongside GEO optimizations.',
    icon: Sparkles
  },
  { 
    name: 'Claude', 
    color: '#d97706',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    description: 'Anthropic\'s nuanced, safety-focused AI',
    citation: 'Values well-reasoned, thorough content',
    strategy: 'Provide thorough analysis and balanced perspectives.',
    icon: Brain
  },
]

const implementationSteps = [
  { 
    title: 'Baseline Assessment', 
    desc: 'Use tools like Profound or Semrush to measure current AI visibility and citation rates.',
    duration: '1-2 weeks'
  },
  { 
    title: 'Content Audit', 
    desc: 'Review existing content for structure, authority signals, and E-E-A-T elements.',
    duration: '2-3 weeks'
  },
  { 
    title: 'Competitor Analysis', 
    desc: 'Identify which competitors are cited by AI and analyze their approach.',
    duration: '1 week'
  },
  { 
    title: 'Priority Content', 
    desc: 'Identify high-value pages to optimize first based on traffic potential.',
    duration: '3-5 days'
  },
  { 
    title: 'Optimization', 
    desc: 'Implement GEO strategies: restructure, add authority, improve clarity.',
    duration: '4-6 weeks'
  },
  { 
    title: 'Monitor & Iterate', 
    desc: 'Track citation rates and adjust strategy based on performance data.',
    duration: 'Ongoing'
  },
]

const references = [
  'Search Engine Roundtable. (2025). "ChatGPT & Google AIO Sources Study."',
  'Aggarwal, P., et al. (2024). "GEO: Generative Engine Optimization." arXiv preprint. Princeton University, Georgia Tech.',
  'Herrman, J. (2025). "SEO Is Dead. Say Hello to GEO." Intelligencer, New York Magazine.',
  'Previsible. (2025). "2025 AI Traffic Report."',
  'Glassdoor/Fishbowl Study. (2023). "Employee ChatGPT Usage Survey."',
  'Andreessen Horowitz. (2025). "How GEO Rewrites the Rules of Search."',
]

// ============================================
// UTILITY COMPONENTS
// ============================================

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  
  // Extract numeric value from string like "527%" or "43"
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = numericValue / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= numericValue) {
              setCount(numericValue)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [numericValue, hasAnimated])

  return <span ref={ref}>{count}{suffix}</span>
}

function ScrollReveal({ children, delay = 0, className = '' }: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedStrategy, setExpandedStrategy] = useState<number | null>(0)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150
      sections.forEach(section => {
        const el = document.getElementById(section.id)
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(section.id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-[#f5f2eb] font-sans selection:bg-[#ff6b5b]/30">
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        :root {
          --color-bg: #0a1628;
          --color-bg-secondary: #0d1d32;
          --color-text: #f5f2eb;
          --color-text-muted: #94a3b8;
          --color-accent: #ff6b5b;
          --color-accent-light: #ff8575;
        }
        
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        /* Grain texture overlay */
        .grain::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.02;
          pointer-events: none;
          z-index: 1000;
        }
        
        /* Smooth scroll */
        html { scroll-behavior: smooth; }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: var(--color-bg); }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #2a4a6f; }
        
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#ff6b5b] to-[#ff8575] z-[100]"
        style={{ width: progressWidth }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6b5b] to-[#ff8575] flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-tight">GEO</span>
                <span className="font-body text-[#94a3b8] text-sm ml-2 hidden sm:inline">Guide</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-[#ff6b5b]/20 text-[#ff6b5b]'
                      : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {section.shortLabel}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0d1d32] border-t border-white/5"
            >
              <div className="px-4 py-4 space-y-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === section.id
                        ? 'bg-[#ff6b5b]/20 text-[#ff6b5b]'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden grain">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1d32] to-[#0a1628]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ff6b5b]/5 to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-[#ff6b5b]/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b5b]/10 border border-[#ff6b5b]/20 text-[#ff6b5b] text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>The Future of Search</span>
              </div>
              
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
                <span className="block text-[#f5f2eb]">Generative</span>
                <span className="block text-[#f5f2eb]">Engine</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b5b] to-[#ff8575]">Optimization</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-[#94a3b8] max-w-xl mb-8 leading-relaxed font-body">
                The complete guide to ranking on AI search engines. Master the art of being cited by ChatGPT, Perplexity, Gemini, and Claude.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('science')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b5b] hover:bg-[#ff8575] text-white rounded-full font-semibold transition-all hover:scale-105"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollToSection('strategies')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-[#f5f2eb] rounded-full font-semibold transition-all border border-white/10"
                >
                  View Strategies
                </button>
              </div>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#ff6b5b]/20 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-[#ff6b5b]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#94a3b8]">AI Response</div>
                      <div className="font-display font-semibold">ChatGPT</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-3 bg-white/10 rounded-full w-full" />
                    <div className="h-3 bg-white/10 rounded-full w-4/5" />
                    <div className="h-3 bg-white/10 rounded-full w-5/6" />
                    <div className="h-3 bg-white/10 rounded-full w-3/4" />
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="text-sm text-[#94a3b8] mb-3">Sources cited:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#ff6b5b]/20 text-[#ff6b5b] text-xs font-medium">your-site.com</span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-[#94a3b8] text-xs">wikipedia.org</span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-[#94a3b8] text-xs">research.edu</span>
                    </div>
                  </div>
                </div>

                {/* Floating stats */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-[#0d1d32] rounded-xl p-4 border border-white/10 shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-2xl font-display font-bold text-[#ff6b5b]">+40%</div>
                  <div className="text-xs text-[#94a3b8]">Visibility</div>
                </motion.div>

                <motion.div 
                  className="absolute -top-6 -right-6 bg-[#0d1d32] rounded-xl p-4 border border-white/10 shadow-2xl"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="text-2xl font-display font-bold text-emerald-400">527%</div>
                  <div className="text-xs text-[#94a3b8]">AI Traffic Growth</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#94a3b8]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </section>

      {/* What is GEO Section */}
      <section id="science" className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-32">
                <span className="text-[#ff6b5b] font-semibold text-sm uppercase tracking-wider">Understanding GEO</span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-6">
                  What is Generative Engine Optimization?
                </h2>
                <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                  While traditional SEO focuses on ranking in search results, GEO targets inclusion and citation within AI-generated answers. The $80+ billion SEO market is being fundamentally disrupted.
                </p>

                {/* Comparison cards */}
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <Search className="w-5 h-5 text-[#94a3b8]" />
                      <h3 className="font-display font-semibold text-[#94a3b8]">Traditional SEO</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-[#94a3b8]">
                      <li className="flex items-center gap-2">• Rank in search results pages</li>
                      <li className="flex items-center gap-2">• Target keywords</li>
                      <li className="flex items-center gap-2">• Build backlinks</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-[#ff6b5b]/10 border border-[#ff6b5b]/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-5 h-5 text-[#ff6b5b]" />
                      <h3 className="font-display font-semibold text-[#ff6b5b]">GEO (New)</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#ff6b5b]" /> Cited in AI-generated answers</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#ff6b5b]" /> Target semantic meaning</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#ff6b5b]" /> Build authority signals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-to-br from-[#0d1d32] to-[#0a1628] rounded-2xl p-8 border border-white/10">
                <h3 className="font-display text-2xl font-bold mb-6">How AI Systems Select Content</h3>
                
                {/* RAG Flow Diagram */}
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Index & Embed', desc: 'Documents converted to semantic vectors' },
                    { step: 2, title: 'Query Processing', desc: 'User question analyzed for intent' },
                    { step: 3, title: 'Retrieval', desc: 'Relevant content segments fetched' },
                    { step: 4, title: 'Generation', desc: 'AI synthesizes cited answer' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#ff6b5b]/20 text-[#ff6b5b] flex items-center justify-center font-display font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1 pb-4 border-b border-white/5 last:border-0">
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-[#94a3b8]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-[#ff6b5b]/5 rounded-xl border border-[#ff6b5b]/20">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-[#ff6b5b] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[#ff6b5b] mb-1">Key Insight</h4>
                      <p className="text-sm text-[#94a3b8]">
                        E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness) are the foundation of AI content selection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Platform Landscape */}
      <section id="landscape" className="py-24 lg:py-32 bg-[#0d1d32]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#ff6b5b] font-semibold text-sm uppercase tracking-wider">AI Landscape</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-6">
                Know Your Platforms
              </h2>
              <p className="text-[#94a3b8] text-lg">
                Each AI platform has distinct citation preferences. Understand them to optimize accordingly.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {platforms.map((platform, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div 
                  className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${platform.bgColor} ${platform.borderColor}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${platform.color}20` }}
                    >
                      <platform.icon className="w-6 h-6" style={{ color: platform.color }} />
                    </div>
                    <div>
                      <h3 className={`font-display text-xl font-bold ${platform.textColor}`}>{platform.name}</h3>
                      <p className="text-sm text-[#94a3b8]">{platform.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Quote className="w-4 h-4 text-[#94a3b8] flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{platform.citation}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-[#94a3b8] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#94a3b8]">{platform.strategy}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#ff6b5b] font-semibold text-sm uppercase tracking-wider">By The Numbers</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-6">
                The Shift is Real
              </h2>
              <p className="text-[#94a3b8] text-lg">
                AI search adoption is accelerating faster than traditional search ever did.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-[#ff6b5b]/30 transition-all">
                  <stat.icon className="w-8 h-8 text-[#ff6b5b] mb-4" />
                  <div className="font-display text-4xl sm:text-5xl font-bold mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[#f5f2eb] font-medium mb-1">{stat.label}</p>
                  <p className="text-xs text-[#94a3b8]">{stat.period}</p>
                  <p className="text-xs text-[#64748b] mt-3 pt-3 border-t border-white/5">{stat.source}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Strategies Section */}
      <section id="strategies" className="py-24 lg:py-32 bg-[#0d1d32]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#ff6b5b] font-semibold text-sm uppercase tracking-wider">Proven Tactics</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-6">
                GEO Strategies
              </h2>
              <p className="text-[#94a3b8] text-lg">
                Research from Princeton and Georgia Tech identified strategies that increase AI visibility by up to 40%.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((strategy, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <motion.div 
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    expandedStrategy === i 
                      ? 'bg-white/10 border-[#ff6b5b]/30' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setExpandedStrategy(expandedStrategy === i ? null : i)}
                  layout
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ff6b5b]/20 flex items-center justify-center">
                      <strategy.icon className="w-6 h-6 text-[#ff6b5b]" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      strategy.impact.includes('High') 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {strategy.impact}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold mb-2">{strategy.title}</h3>
                  
                  <p className="text-[#94a3b8] text-sm mb-4">
                    {expandedStrategy === i ? strategy.fullDesc : strategy.shortDesc}
                  </p>

                  <AnimatePresence>
                    {expandedStrategy === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 border-t border-white/10"
                      >
                        <p className="text-xs text-[#94a3b8] uppercase tracking-wider mb-3">Action Items:</p>
                        <ul className="space-y-2">
                          {strategy.tips.map((tip, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm">
                              <ChevronRight className="w-4 h-4 text-[#ff6b5b] flex-shrink-0 mt-0.5" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-2 mt-4 text-sm text-[#94a3b8]">
                    <span>{expandedStrategy === i ? 'Show less' : 'Show more'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedStrategy === i ? 'rotate-180' : ''}`} />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section id="implementation" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#ff6b5b] font-semibold text-sm uppercase tracking-wider">Getting Started</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-6">
                Implementation Roadmap
              </h2>
              <p className="text-[#94a3b8] text-lg">
                A step-by-step guide to implementing GEO in your organization.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff6b5b] to-transparent" />

              <div className="space-y-8">
                {implementationSteps.map((step, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="relative flex gap-6">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-[#0a1628] border-2 border-[#ff6b5b] flex items-center justify-center flex-shrink-0">
                        <span className="font-display font-bold text-[#ff6b5b]">{i + 1}</span>
                      </div>
                      <div className="flex-1 pb-8 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-xl font-bold">{step.title}</h3>
                          <span className="px-2 py-1 rounded-full bg-white/5 text-[#94a3b8] text-xs">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-[#94a3b8]">{step.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Checklist */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#ff6b5b]/10 to-[#ff6b5b]/5 rounded-2xl p-8 border border-[#ff6b5b]/20">
                <h3 className="font-display text-2xl font-bold mb-6 text-center">Content Optimization Checklist</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Clear, descriptive headings (H1, H2, H3)',
                    'Summary or "key takeaways" section',
                    'Author bio with credentials',
                    'External citations to sources',
                    'Comprehensive topic coverage',
                    'Publication date visible',
                    'FAQ section included',
                    'Natural, conversational language',
                  ].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#ff6b5b] focus:ring-[#ff6b5b]" />
                      <span className="text-sm">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Future Section */}
      <section id="future" className="py-24 lg:py-32 bg-[#0d1d32]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#ff6b5b] font-semibold text-sm uppercase tracking-wider">Looking Ahead</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-6">
                The Future of AI Search
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-display text-2xl font-bold mb-6">Emerging Trends</h3>
                <div className="space-y-6">
                  {[
                    { title: 'Search Fragmentation', desc: 'AI-native search spreading across platforms. Apple integrating Perplexity into Safari.' },
                    { title: 'Business Model Evolution', desc: 'Subscription-driven LLMs vs ad-supported search. Quality over click-through.' },
                    { title: 'Conversational Commerce', desc: 'AI systems becoming shopping assistants and purchase advisors.' },
                  ].map((trend, i) => (
                    <div key={i}>
                      <h4 className="font-semibold text-[#ff6b5b] mb-1">{trend.title}</h4>
                      <p className="text-sm text-[#94a3b8]">{trend.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-[#ff6b5b]/10 to-transparent border border-[#ff6b5b]/20">
                <h3 className="font-display text-2xl font-bold mb-6">Prepare for the Future</h3>
                <div className="space-y-4">
                  {[
                    'Invest in genuinely helpful, comprehensive content',
                    'Build recognized expertise in your domain',
                    'Keep content fresh and relevant',
                    'Track how AI platforms evolve',
                    'Make GEO part of overall content strategy',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#ff6b5b]/20 text-[#ff6b5b] flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Warning */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-display text-lg font-bold text-red-400 mb-2">The Cost of Inaction</h4>
                  <p className="text-[#94a3b8]">
                    Companies not adapting to GEO risk becoming invisible in the next era of search. Early movers are capturing citation share now while competition remains relatively low.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* References */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold mb-8">References</h2>
            <ol className="space-y-3 text-sm text-[#64748b]">
              {references.map((ref, i) => (
                <li key={i} className="pl-4 border-l-2 border-white/10">
                  {ref}
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b5b] to-[#ff8575] flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold">GEO Guide</span>
          </div>
          <p className="text-[#64748b] text-sm">
            Compiled for educational purposes. Based on research from Princeton University, Georgia Tech, and leading industry sources.
          </p>
          <p className="text-[#475569] text-xs mt-4">February 2026</p>
        </div>
      </footer>
    </div>
  )
}

export default App
