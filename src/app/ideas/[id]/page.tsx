'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { StageBadge, StageProgress } from '@/components/ideas/StageBadge';

type IdeaStage = 'CAPTURE' | 'EXPAND' | 'VALIDATE' | 'PROTOTYPE' | 'BUILD' | 'ITERATE';

interface Idea {
  id: string;
  title: string;
  description: string;
  stage: IdeaStage;
  status: 'ACTIVE' | 'ARCHIVED' | 'COMPLETED' | 'ON_HOLD';
  createdAt: string;
  updatedAt: string;
  expansion?: {
    breakdown?: string;
    userStories?: string;
    constraints?: string;
    clarityQuestions?: string;
    firstPrinciples?: string;
  };
  validation?: {
    feasibilityScore?: number;
    marketFit?: string;
    competitorAnalysis?: string;
    risks?: string;
    assumptions?: string;
    validated?: boolean;
  };
  prototype?: {
    wireframes?: string;
    workflow?: string;
    techOutline?: string;
    mockups?: string;
  };
  build?: {
    repoUrl?: string;
    deploymentUrl?: string;
    techStack?: string;
    milestones?: string;
    progress?: number;
  };
  iterations?: Array<{
    id: string;
    version: number;
    changes: string;
    feedback?: string;
    improvements?: string;
    createdAt: string;
  }>;
  tags?: Array<{ id: string; name: string; color: string }>;
  comments?: Array<{
    id: string;
    content: string;
    user: { id: string; name: string };
    createdAt: string;
  }>;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function IdeaDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'expand' | 'validate' | 'prototype' | 'build' | 'iterate'>('overview');

  const fetchIdea = async () => {
    try {
      const response = await fetch(`/api/ideas/${id}`);
      if (response.ok) {
        const data = await response.json();
        setIdea(data);
      } else {
        router.push('/ideas');
      }
    } catch (error) {
      console.error('Error fetching idea:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdea();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- fetchIdea is defined inside component and changes on every render, but we only want to fetch on id change
  }, [id]);

  const updateStage = async (newStage: IdeaStage) => {
    try {
      const response = await fetch(`/api/ideas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      });
      if (response.ok) {
        fetchIdea();
      }
    } catch (error) {
      console.error('Error updating stage:', error);
    }
  };

  const deleteIdea = async () => {
    if (!confirm('Are you sure you want to delete this idea?')) return;
    try {
      const response = await fetch(`/api/ideas/${id}`, { method: 'DELETE' });
      if (response.ok) {
        router.push('/ideas');
      }
    } catch (error) {
      console.error('Error deleting idea:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading idea...</p>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Idea not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'expand', label: 'Expand', icon: '🔍' },
    { id: 'validate', label: 'Validate', icon: '✓' },
    { id: 'prototype', label: 'Prototype', icon: '📐' },
    { id: 'build', label: 'Build', icon: '🔨' },
    { id: 'iterate', label: 'Iterate', icon: '🔄' },
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {idea.title}
            </h1>
            <div className="flex items-center gap-3">
              <StageBadge stage={idea.stage} />
              <Badge variant={idea.status === 'ACTIVE' ? 'success' : 'default'}>
                {idea.status}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/ideas')}>
              ← Back
            </Button>
            <Button variant="danger" onClick={deleteIdea}>
              Delete
            </Button>
          </div>
        </div>

        <StageProgress currentStage={idea.stage} className="mt-4" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab idea={idea} />}
      {activeTab === 'expand' && <ExpandTab idea={idea} onUpdate={fetchIdea} />}
      {activeTab === 'validate' && <ValidateTab idea={idea} onUpdate={fetchIdea} />}
      {activeTab === 'prototype' && <PrototypeTab idea={idea} onUpdate={fetchIdea} />}
      {activeTab === 'build' && <BuildTab idea={idea} onUpdate={fetchIdea} />}
      {activeTab === 'iterate' && <IterateTab idea={idea} onUpdate={fetchIdea} />}

      {/* Stage Actions */}
      <Card className="mt-8">
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Move to Next Stage
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(['CAPTURE', 'EXPAND', 'VALIDATE', 'PROTOTYPE', 'BUILD', 'ITERATE'] as IdeaStage[]).map(
              (stage) => (
                <Button
                  key={stage}
                  variant={idea.stage === stage ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => updateStage(stage)}
                  disabled={idea.stage === stage}
                >
                  {stage.charAt(0) + stage.slice(1).toLowerCase()}
                </Button>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function OverviewTab({ idea }: { idea: Idea }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Description</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
            {idea.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Details</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Created</span>
            <span className="text-gray-900 dark:text-white">
              {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Updated</span>
            <span className="text-gray-900 dark:text-white">
              {new Date(idea.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Iterations</span>
            <span className="text-gray-900 dark:text-white">
              {idea.iterations?.length ?? 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Comments</span>
            <span className="text-gray-900 dark:text-white">
              {idea.comments?.length ?? 0}
            </span>
          </div>
        </CardContent>
      </Card>

      {idea.tags && idea.tags.length > 0 && (
        <Card className="md:col-span-2">
          <CardHeader>
            <h3 className="font-semibold text-gray-900 dark:text-white">Tags</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {idea.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ExpandTab({ idea, onUpdate }: { idea: Idea; onUpdate: () => void }) {
  const [breakdown, setBreakdown] = useState(idea.expansion?.breakdown ?? '');
  const [userStories, setUserStories] = useState(idea.expansion?.userStories ?? '');
  const [constraints, setConstraints] = useState(idea.expansion?.constraints ?? '');
  const [clarityQuestions, setClarityQuestions] = useState(idea.expansion?.clarityQuestions ?? '');
  const [firstPrinciples, setFirstPrinciples] = useState(idea.expansion?.firstPrinciples ?? '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`/api/ideas/${idea.id}/expand`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          breakdown,
          userStories,
          constraints,
          clarityQuestions,
          firstPrinciples,
        }),
      });
      onUpdate();
    } catch (error) {
      console.error('Error saving expansion:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Breakdown</h3>
          <p className="text-sm text-gray-500">Break your idea into smaller components</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={breakdown}
            onChange={(e) => setBreakdown(e.target.value)}
            rows={4}
            placeholder="List the main components and features of your idea..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">User Stories</h3>
          <p className="text-sm text-gray-500">Define how users will interact with your idea</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={userStories}
            onChange={(e) => setUserStories(e.target.value)}
            rows={4}
            placeholder="As a [user], I want to [action] so that [benefit]..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Constraints</h3>
          <p className="text-sm text-gray-500">What are the limitations or constraints?</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            rows={3}
            placeholder="Time, budget, technical limitations..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Clarity Questions</h3>
          <p className="text-sm text-gray-500">Questions that need to be answered</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={clarityQuestions}
            onChange={(e) => setClarityQuestions(e.target.value)}
            rows={3}
            placeholder="What needs to be clarified before moving forward?"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">First Principles</h3>
          <p className="text-sm text-gray-500">Break down to fundamental truths</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={firstPrinciples}
            onChange={(e) => setFirstPrinciples(e.target.value)}
            rows={3}
            placeholder="What are the core assumptions and fundamentals?"
          />
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving}>
        {saving ? 'Saving...' : 'Save Expansion'}
      </Button>
    </div>
  );
}

function ValidateTab({ idea, onUpdate }: { idea: Idea; onUpdate: () => void }) {
  const [feasibilityScore, setFeasibilityScore] = useState(idea.validation?.feasibilityScore ?? 5);
  const [marketFit, setMarketFit] = useState(idea.validation?.marketFit ?? '');
  const [competitorAnalysis, setCompetitorAnalysis] = useState(idea.validation?.competitorAnalysis ?? '');
  const [risks, setRisks] = useState(idea.validation?.risks ?? '');
  const [assumptions, setAssumptions] = useState(idea.validation?.assumptions ?? '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`/api/ideas/${idea.id}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feasibilityScore,
          marketFit,
          competitorAnalysis,
          risks,
          assumptions,
        }),
      });
      onUpdate();
    } catch (error) {
      console.error('Error saving validation:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Feasibility Score</h3>
          <p className="text-sm text-gray-500">Rate the feasibility (1-10)</p>
        </CardHeader>
        <CardContent>
          <input
            type="range"
            min="1"
            max="10"
            value={feasibilityScore}
            onChange={(e) => setFeasibilityScore(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-2xl font-bold text-blue-600 mt-2">
            {feasibilityScore}/10
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Market Fit</h3>
          <p className="text-sm text-gray-500">Who is the target market?</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={marketFit}
            onChange={(e) => setMarketFit(e.target.value)}
            rows={3}
            placeholder="Describe your target audience and market need..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Competitor Analysis</h3>
          <p className="text-sm text-gray-500">Who are the competitors?</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={competitorAnalysis}
            onChange={(e) => setCompetitorAnalysis(e.target.value)}
            rows={3}
            placeholder="List existing solutions and how yours differs..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Risks</h3>
          <p className="text-sm text-gray-500">Potential risks and challenges</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={risks}
            onChange={(e) => setRisks(e.target.value)}
            rows={3}
            placeholder="What could go wrong?"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Assumptions</h3>
          <p className="text-sm text-gray-500">Key assumptions to test</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={assumptions}
            onChange={(e) => setAssumptions(e.target.value)}
            rows={3}
            placeholder="What assumptions are you making?"
          />
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving}>
        {saving ? 'Saving...' : 'Save Validation'}
      </Button>
    </div>
  );
}

function PrototypeTab({ idea, onUpdate }: { idea: Idea; onUpdate: () => void }) {
  const [wireframes, setWireframes] = useState(idea.prototype?.wireframes ?? '');
  const [workflow, setWorkflow] = useState(idea.prototype?.workflow ?? '');
  const [techOutline, setTechOutline] = useState(idea.prototype?.techOutline ?? '');
  const [mockups, setMockups] = useState(idea.prototype?.mockups ?? '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`/api/ideas/${idea.id}/prototype`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wireframes,
          workflow,
          techOutline,
          mockups,
        }),
      });
      onUpdate();
    } catch (error) {
      console.error('Error saving prototype:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Wireframes</h3>
          <p className="text-sm text-gray-500">Describe or link to UI wireframes</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={wireframes}
            onChange={(e) => setWireframes(e.target.value)}
            rows={4}
            placeholder="Describe the UI layout or paste links to wireframes..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Workflow</h3>
          <p className="text-sm text-gray-500">User journey and process flows</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
            rows={4}
            placeholder="Describe the user workflow step by step..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Technical Outline</h3>
          <p className="text-sm text-gray-500">Architecture and tech decisions</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={techOutline}
            onChange={(e) => setTechOutline(e.target.value)}
            rows={4}
            placeholder="Describe the technical architecture..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Mockups</h3>
          <p className="text-sm text-gray-500">Links to mockups or design files</p>
        </CardHeader>
        <CardContent>
          <Input
            value={mockups}
            onChange={(e) => setMockups(e.target.value)}
            placeholder="Link to Figma, design files, etc."
          />
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving}>
        {saving ? 'Saving...' : 'Save Prototype'}
      </Button>
    </div>
  );
}

function BuildTab({ idea, onUpdate }: { idea: Idea; onUpdate: () => void }) {
  const [repoUrl, setRepoUrl] = useState(idea.build?.repoUrl ?? '');
  const [deploymentUrl, setDeploymentUrl] = useState(idea.build?.deploymentUrl ?? '');
  const [techStack, setTechStack] = useState(idea.build?.techStack ?? '');
  const [milestones, setMilestones] = useState(idea.build?.milestones ?? '');
  const [progress, setProgress] = useState(idea.build?.progress ?? 0);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`/api/ideas/${idea.id}/build`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoUrl,
          deploymentUrl,
          techStack,
          milestones,
          progress,
        }),
      });
      onUpdate();
    } catch (error) {
      console.error('Error saving build:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Build Progress</h3>
        </CardHeader>
        <CardContent>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-2xl font-bold text-green-600 mt-2">
            {progress}% Complete
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Repository URL</h3>
        </CardHeader>
        <CardContent>
          <Input
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Deployment URL</h3>
        </CardHeader>
        <CardContent>
          <Input
            value={deploymentUrl}
            onChange={(e) => setDeploymentUrl(e.target.value)}
            placeholder="https://your-app.vercel.app"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Tech Stack</h3>
        </CardHeader>
        <CardContent>
          <Textarea
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            rows={3}
            placeholder="List technologies used (Next.js, React, PostgreSQL, etc.)"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Milestones</h3>
        </CardHeader>
        <CardContent>
          <Textarea
            value={milestones}
            onChange={(e) => setMilestones(e.target.value)}
            rows={4}
            placeholder="List key milestones and their status..."
          />
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving}>
        {saving ? 'Saving...' : 'Save Build Info'}
      </Button>
    </div>
  );
}

function IterateTab({ idea, onUpdate }: { idea: Idea; onUpdate: () => void }) {
  const [changes, setChanges] = useState('');
  const [feedback, setFeedback] = useState('');
  const [improvements, setImprovements] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!changes.trim()) return;
    setSaving(true);
    try {
      await fetch(`/api/ideas/${idea.id}/iterate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          changes,
          feedback,
          improvements,
        }),
      });
      setChanges('');
      setFeedback('');
      setImprovements('');
      onUpdate();
    } catch (error) {
      console.error('Error saving iteration:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* New Iteration Form */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">New Iteration</h3>
          <p className="text-sm text-gray-500">Document changes and improvements</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            label="What Changed?"
            value={changes}
            onChange={(e) => setChanges(e.target.value)}
            rows={3}
            placeholder="Describe what was changed or added..."
          />
          <Textarea
            label="Feedback Received"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
            placeholder="User feedback or test results..."
          />
          <Textarea
            label="Planned Improvements"
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
            rows={3}
            placeholder="What will be improved next?"
          />
          <Button onClick={save} disabled={saving || !changes.trim()}>
            {saving ? 'Saving...' : 'Add Iteration'}
          </Button>
        </CardContent>
      </Card>

      {/* Iteration History */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Iteration History</h3>
        </CardHeader>
        <CardContent>
          {idea.iterations && idea.iterations.length > 0 ? (
            <div className="space-y-4">
              {idea.iterations.map((iteration) => (
                <div
                  key={iteration.id}
                  className="border-l-4 border-blue-500 pl-4 py-2"
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="info">v{iteration.version}</Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(iteration.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium mb-1">
                    {iteration.changes}
                  </p>
                  {iteration.feedback && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Feedback: {iteration.feedback}
                    </p>
                  )}
                  {iteration.improvements && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Next: {iteration.improvements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No iterations yet. Start refining your idea!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
