import Link from 'next/link';
import {
  LightbulbIcon,
  ExpandIcon,
  CheckCircleIcon,
  LayersIcon,
  WrenchIcon,
  RefreshIcon,
  CameraIcon,
  ArrowUpRightIcon,
  PlayIcon,
  ZapIcon,
  TargetIcon,
  CodeIcon,
  ShieldIcon,
  MessageSquareIcon,
  CompassIcon,
  QuoteIcon,
  ArrowRightIcon,
  SettingsIcon,
  StarIcon,
} from '@/components/ui/Icons';

export default function Home() {
  const stages = [
    { name: 'Capture', icon: LightbulbIcon, description: 'Collect ideas instantly before they disappear' },
    { name: 'Expand', icon: ExpandIcon, description: 'Break down and explore the concept deeply' },
    { name: 'Validate', icon: CheckCircleIcon, description: 'Test if the idea makes sense in reality' },
    { name: 'Prototype', icon: LayersIcon, description: 'Form a structure or early design' },
    { name: 'Build', icon: WrenchIcon, description: 'Create a working version of the idea' },
    { name: 'Iterate', icon: RefreshIcon, description: 'Refine and improve continuously' },
  ];

  const pillars = [
    {
      title: 'Idea Capture',
      description: 'Catch ideas the moment they appear — text, sketches, voice, memory cues — before they disappear into the void.',
      icon: CameraIcon,
    },
    {
      title: 'Idea Expansion',
      description: 'Convert rough sparks into structured concepts using breakdowns, user stories, diagrams, and first principles reasoning.',
      icon: ArrowUpRightIcon,
    },
    {
      title: 'Idea Execution',
      description: 'Turn concepts into action through prototypes, UI sketches, workflow drafts, technical outlines, and minimal builds.',
      icon: PlayIcon,
    },
    {
      title: 'Idea Ecosystem',
      description: 'Develop tools, habits, and workflows that support continuous long-term creativity and sustainable innovation.',
      icon: LayersIcon,
    },
  ];

  const values = [
    {
      title: 'Practical Innovation',
      description: 'Focus on what works, not what sounds impressive',
      icon: ZapIcon,
    },
    {
      title: 'Fast Execution',
      description: 'Quick loops from idea to prototype to iteration',
      icon: TargetIcon,
    },
    {
      title: 'Open-Source Culture',
      description: 'Built in the open, shared with the community',
      icon: CodeIcon,
    },
    {
      title: 'Privacy-First',
      description: 'Your ideas stay yours, always encrypted and secure',
      icon: ShieldIcon,
    },
    {
      title: 'Direct Communication',
      description: 'No fluff, no jargon — just clear, honest talk',
      icon: MessageSquareIcon,
    },
    {
      title: 'Grounded Thinking',
      description: 'Creative but practical, visionary yet realistic',
      icon: CompassIcon,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-6">
              <StarIcon className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Builder Ecosystem</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Turn thoughts into{' '}
              <span className="text-blue-600">products</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              OpenIdeas removes friction from the creative process so ideas can move from{' '}
              <span className="font-medium text-gray-900">spark</span> to{' '}
              <span className="font-medium text-gray-900">structure</span> to{' '}
              <span className="font-medium text-gray-900">execution</span>{' '}
              quickly and cleanly.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Link 
                href="/capture"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Get Started
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link 
                href="/ideas"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
            
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">10,000+</span> ideas captured by builders worldwide
            </p>
          </div>
          
          {/* Right - Dashboard Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl -z-10 transform rotate-1"></div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              {/* Dashboard Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <LightbulbIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Idea Dashboard</h3>
                  <p className="text-sm text-gray-500">3 active projects</p>
                </div>
              </div>
              
              {/* Project Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <ZapIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">AI Code Assistant</span>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">Build</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <SettingsIcon className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-900">Task Manager App</span>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">Validate</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                      <CodeIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="font-medium text-gray-900">Developer Portfolio</span>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">Prototype</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Pipeline Progress</span>
                  <span className="text-sm font-semibold text-blue-600">67%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Idea Lifecycle Section */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Idea Lifecycle</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every idea flows through the same clean pipeline, ensuring evolution instead of being forgotten.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {stages.map((stage, index) => (
              <div key={stage.name} className="relative group">
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stage.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{stage.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{stage.description}</p>
                </div>
                {index < stages.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <span className="text-gray-300">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Flow indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            {stages.map((stage, index) => (
              <span key={stage.name} className="flex items-center gap-2">
                <span className="font-medium">{stage.name}</span>
                {index < stages.length - 1 && <span className="text-gray-300">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section id="features" className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Pillars</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Four foundational elements that power the OpenIdeas system
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                  <pillar.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Quote Section */}
      <section id="philosophy" className="bg-gray-50 py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <QuoteIcon className="w-8 h-8 text-blue-600" />
            </div>
            
            <blockquote className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              &ldquo;Ideas deserve execution-level respect.&rdquo;
            </blockquote>
            
            <div className="w-16 h-0.5 bg-gray-200 mx-auto mb-10"></div>
            
            <div className="grid md:grid-cols-2 gap-12 text-left max-w-3xl mx-auto">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Builder-First Mindset</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every idea is treated as a potential product. The system focuses on speed, clarity, usefulness, and disciplined creativity. No fluff. No motivational talk.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Structured Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Most great ideas die because they are forgotten, underdeveloped, or never executed. OpenIdeas provides a clear system to move any idea through meaningful stages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              OpenIdeas is not a motivational brand. It&apos;s a builder movement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Build?
            </h2>
            <p className="text-gray-600 mb-8">
              Stop letting great ideas die. Start the journey from capture to iteration today.
            </p>
            <Link 
              href="/capture"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm text-lg"
            >
              Get Started Now
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
