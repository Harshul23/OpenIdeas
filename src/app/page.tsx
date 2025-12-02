import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const stages = [
    { name: 'Capture', icon: '💡', description: 'Catch ideas the moment they appear' },
    { name: 'Expand', icon: '🔍', description: 'Break down and explore ideas in detail' },
    { name: 'Validate', icon: '✓', description: 'Test if your idea makes sense in reality' },
    { name: 'Prototype', icon: '📐', description: 'Form a structure or early design' },
    { name: 'Build', icon: '🔨', description: 'Create a working version' },
    { name: 'Iterate', icon: '🔄', description: 'Refine and improve continuously' },
  ];

  const features = [
    {
      title: 'Practical Innovation',
      description: 'Every idea is treated as a potential product with structured execution.',
      icon: '🎯',
    },
    {
      title: 'Fast Execution Loops',
      description: 'Move from spark to prototype quickly with clear workflows.',
      icon: '⚡',
    },
    {
      title: 'Builder-First Mindset',
      description: 'Focus on building, not just planning. Actions over intentions.',
      icon: '🏗️',
    },
    {
      title: 'Open Source Culture',
      description: 'Privacy-first design with open collaboration and transparency.',
      icon: '🌐',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Turn Ideas Into Reality
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          OpenIdeas helps you manufacture ideas and build them with speed, clarity, and intelligence.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/capture">
            <Button size="lg">
              💡 Capture New Idea
            </Button>
          </Link>
          <Link href="/ideas">
            <Button variant="outline" size="lg">
              View All Ideas
            </Button>
          </Link>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-8">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-none">
          <CardContent className="py-8 text-center">
            <blockquote className="text-2xl font-medium text-gray-800 dark:text-white italic">
              &ldquo;Ideas deserve execution-level respect.&rdquo;
            </blockquote>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              The core philosophy of OpenIdeas
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Idea Lifecycle */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          The Idea Lifecycle
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stages.map((stage, index) => (
            <Card key={stage.name} className="text-center">
              <CardContent className="py-6">
                <div className="text-4xl mb-3">{stage.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {index + 1}. {stage.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stage.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Why OpenIdeas?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="py-6">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Build?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Stop letting great ideas die. Start the journey from capture to iteration today.
        </p>
        <Link href="/capture">
          <Button size="lg">
            Get Started Now →
          </Button>
        </Link>
      </section>
    </div>
  );
}
