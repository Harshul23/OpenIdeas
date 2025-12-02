'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { CreateIdeaForm } from '@/components/ideas/CreateIdeaForm';
import { LightbulbIcon } from '@/components/ui/Icons';

export default function CapturePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get or create a default user for demo purposes
    const initUser = async () => {
      try {
        // Try to get existing users
        const response = await fetch('/api/users');
        if (response.ok) {
          const users = await response.json();
          if (users.length > 0) {
            setUserId(users[0].id);
          } else {
            // Create a default user
            const createResponse = await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: 'demo@openideas.dev',
                name: 'Demo User',
              }),
            });
            if (createResponse.ok) {
              const newUser = await createResponse.json();
              setUserId(newUser.id);
            }
          }
        }
      } catch (error) {
        console.error('Error initializing user:', error);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  const handleSubmit = async (data: { title: string; description: string; tags: string[] }) => {
    if (!userId) return;

    const response = await fetch('/api/ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        userId,
      }),
    });

    if (response.ok) {
      const idea = await response.json();
      router.push(`/ideas/${idea.id}`);
    }
  };

  if (loading) {
    return (
      <div className="bg-white">
        <div className="section-container py-16">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-container py-16 lg:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-6">
            <LightbulbIcon className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Start Building</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Capture Your Idea
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The first step in the idea lifecycle. Catch it before it disappears — every great product starts with a simple thought.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-gray-50 py-12">
        <div className="section-container max-w-2xl mx-auto">
          <Card className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">
                What&apos;s your idea?
              </h2>
              <p className="text-sm text-gray-500">
                Don&apos;t worry about perfection — just get it down. You can expand and refine it later.
              </p>
            </CardHeader>
            <CardContent>
              <CreateIdeaForm
                onSubmit={handleSubmit}
                onCancel={() => router.push('/ideas')}
              />
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <CardContent className="py-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <LightbulbIcon className="w-4 h-4 text-blue-600" />
                </div>
                Tips for Capturing Ideas
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs">1</span>
                  </span>
                  <span><strong className="text-gray-900">Be specific:</strong> What problem does this solve?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs">2</span>
                  </span>
                  <span><strong className="text-gray-900">Keep it simple:</strong> One core concept per idea</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs">3</span>
                  </span>
                  <span><strong className="text-gray-900">Think user-first:</strong> Who benefits from this?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs">4</span>
                  </span>
                  <span><strong className="text-gray-900">No judgment:</strong> Every idea is valid at this stage</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
