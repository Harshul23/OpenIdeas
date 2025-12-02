'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StageBadge } from './StageBadge';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface IdeaCardProps {
  id: string;
  title: string;
  description: string;
  stage: 'CAPTURE' | 'EXPAND' | 'VALIDATE' | 'PROTOTYPE' | 'BUILD' | 'ITERATE';
  status: 'ACTIVE' | 'ARCHIVED' | 'COMPLETED' | 'ON_HOLD';
  tags?: Tag[];
  commentsCount?: number;
  iterationsCount?: number;
  updatedAt: string;
}

const statusConfig = {
  ACTIVE: { label: 'Active', variant: 'success' as const },
  ARCHIVED: { label: 'Archived', variant: 'default' as const },
  COMPLETED: { label: 'Completed', variant: 'info' as const },
  ON_HOLD: { label: 'On Hold', variant: 'warning' as const },
};

export function IdeaCard({
  id,
  title,
  description,
  stage,
  status,
  tags,
  commentsCount = 0,
  iterationsCount = 0,
  updatedAt,
}: IdeaCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Link href={`/ideas/${id}`}>
      <Card hover className="h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
              {title}
            </h3>
            <Badge variant={statusInfo.variant} size="sm">
              {statusInfo.label}
            </Badge>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <StageBadge stage={stage} />
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-0.5 text-xs rounded-full"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-3">
              <span>💬 {commentsCount}</span>
              <span>🔄 v{iterationsCount}</span>
            </div>
            <span>
              Updated {new Date(updatedAt).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
