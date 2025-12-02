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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8 text-center">
        <div className="text-5xl mb-4">💡</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Capture Your Idea
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          The first step in the idea lifecycle. Catch it before it disappears.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900 dark:text-white">
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
      <Card className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
        <CardContent className="py-6">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
            💡 Tips for Capturing Ideas
          </h3>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
            <li>• <strong>Be specific:</strong> What problem does this solve?</li>
            <li>• <strong>Keep it simple:</strong> One core concept per idea</li>
            <li>• <strong>Think user-first:</strong> Who benefits from this?</li>
            <li>• <strong>No judgment:</strong> Every idea is valid at this stage</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
