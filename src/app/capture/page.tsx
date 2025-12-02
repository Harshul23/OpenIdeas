'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { CreateIdeaForm } from '@/components/ideas/CreateIdeaForm';

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
      <div className="section-container py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container py-12 max-w-2xl mx-auto">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 21h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Capture Your Idea
        </h1>
        <p className="text-gray-600">
          The first step in the idea lifecycle. Catch it before it disappears.
        </p>
      </div>

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
      <Card className="mt-8 bg-blue-50 border-blue-100 rounded-2xl">
        <CardContent className="py-6">
          <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 21h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Tips for Capturing Ideas
          </h3>
          <ul className="space-y-3 text-sm text-blue-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong>Be specific:</strong> What problem does this solve?</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong>Keep it simple:</strong> One core concept per idea</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong>Think user-first:</strong> Who benefits from this?</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span><strong>No judgment:</strong> Every idea is valid at this stage</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
