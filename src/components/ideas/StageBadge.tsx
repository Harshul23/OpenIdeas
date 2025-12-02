'use client';

import { Badge } from '@/components/ui/Badge';

type IdeaStage = 'CAPTURE' | 'EXPAND' | 'VALIDATE' | 'PROTOTYPE' | 'BUILD' | 'ITERATE';

interface StageBadgeProps {
  stage: IdeaStage;
  className?: string;
}

const stageConfig: Record<IdeaStage, { label: string; variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'; icon: string }> = {
  CAPTURE: { label: 'Capture', variant: 'info', icon: '💡' },
  EXPAND: { label: 'Expand', variant: 'purple', icon: '🔍' },
  VALIDATE: { label: 'Validate', variant: 'warning', icon: '✓' },
  PROTOTYPE: { label: 'Prototype', variant: 'default', icon: '📐' },
  BUILD: { label: 'Build', variant: 'success', icon: '🔨' },
  ITERATE: { label: 'Iterate', variant: 'info', icon: '🔄' },
};

export function StageBadge({ stage, className }: StageBadgeProps) {
  const config = stageConfig[stage];

  return (
    <Badge variant={config.variant} className={className}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
}

interface StageProgressProps {
  currentStage: IdeaStage;
  className?: string;
}

const stages: IdeaStage[] = ['CAPTURE', 'EXPAND', 'VALIDATE', 'PROTOTYPE', 'BUILD', 'ITERATE'];

export function StageProgress({ currentStage, className = '' }: StageProgressProps) {
  const currentIndex = stages.indexOf(currentStage);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {stages.map((stage, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const config = stageConfig[stage];

        return (
          <div key={stage} className="flex items-center">
            <div
              className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm
                ${isCompleted ? 'bg-green-500 text-white' : ''}
                ${isCurrent ? 'bg-blue-500 text-white ring-2 ring-blue-200' : ''}
                ${!isCompleted && !isCurrent ? 'bg-gray-200 dark:bg-gray-700 text-gray-500' : ''}
              `}
              title={config.label}
            >
              {config.icon}
            </div>
            {index < stages.length - 1 && (
              <div
                className={`w-6 h-0.5 mx-1 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
