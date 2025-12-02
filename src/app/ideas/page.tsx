'use client';

import { useState, useEffect, useCallback } from 'react';
import { IdeaCard } from '@/components/ideas/IdeaCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { LightbulbIcon, ArrowRightIcon } from '@/components/ui/Icons';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface Idea {
  id: string;
  title: string;
  description: string;
  stage: 'CAPTURE' | 'EXPAND' | 'VALIDATE' | 'PROTOTYPE' | 'BUILD' | 'ITERATE';
  status: 'ACTIVE' | 'ARCHIVED' | 'COMPLETED' | 'ON_HOLD';
  tags: Tag[];
  _count: {
    comments: number;
    iterations: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const fetchIdeas = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (stageFilter) params.append('stage', stageFilter);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/ideas?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setIdeas(data);
      }
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  }, [search, stageFilter, statusFilter]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchIdeas();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchIdeas]);

  const stages = ['CAPTURE', 'EXPAND', 'VALIDATE', 'PROTOTYPE', 'BUILD', 'ITERATE'];
  const statuses = ['ACTIVE', 'ARCHIVED', 'COMPLETED', 'ON_HOLD'];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="section-container py-16 lg:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-6">
            <LightbulbIcon className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Community Ideas</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore Ideas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse and discover ideas from the community. Track progress through the lifecycle and find inspiration for your next project.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
          <Link href="/capture">
            <Button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3">
              Capture New Idea
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12">
        <div className="section-container">
          <Card className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <CardContent className="py-5">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search ideas..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <select
                  className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                >
                  <option value="">All Stages</option>
                  {stages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage.charAt(0) + stage.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                <select
                  className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Ideas Grid */}
          <div className="mt-8">
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading ideas...</p>
              </div>
            ) : ideas.length === 0 ? (
              <Card className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <CardContent>
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <LightbulbIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No ideas yet
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Start capturing your ideas to build something amazing. Every great product starts with a simple thought.
                  </p>
                  <Link href="/capture">
                    <Button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3">
                      Capture Your First Idea
                      <ArrowRightIcon className="w-5 h-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    id={idea.id}
                    title={idea.title}
                    description={idea.description}
                    stage={idea.stage}
                    status={idea.status}
                    tags={idea.tags}
                    commentsCount={idea._count.comments}
                    iterationsCount={idea._count.iterations}
                    updatedAt={idea.updatedAt}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
