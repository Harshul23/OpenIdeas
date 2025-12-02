'use client';

import { useState, useEffect, useCallback } from 'react';
import { IdeaCard } from '@/components/ideas/IdeaCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Ideas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track your ideas through the lifecycle
          </p>
        </div>
        <Link href="/capture">
          <Button>
            + New Idea
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search ideas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading ideas...</p>
        </div>
      ) : ideas.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No ideas yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start capturing your ideas to build something amazing
            </p>
            <Link href="/capture">
              <Button>Capture Your First Idea</Button>
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
  );
}
