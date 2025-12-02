'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface CreateIdeaFormProps {
  onSubmit: (data: { title: string; description: string; tags: string[] }) => Promise<void>;
  onCancel?: () => void;
}

export function CreateIdeaForm({ onSubmit, onCancel }: CreateIdeaFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const newErrors: { title?: string; description?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);
      await onSubmit({ title: title.trim(), description: description.trim(), tags });
      setTitle('');
      setDescription('');
      setTagsInput('');
    } catch (error) {
      console.error('Error creating idea:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="title"
        label="Title"
        placeholder="What's your idea?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        disabled={isSubmitting}
      />

      <Textarea
        id="description"
        label="Description"
        placeholder="Describe your idea in detail..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={errors.description}
        rows={4}
        disabled={isSubmitting}
      />

      <Input
        id="tags"
        label="Tags (comma-separated)"
        placeholder="e.g., AI, Mobile App, SaaS"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        disabled={isSubmitting}
      />

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Capturing...' : '💡 Capture Idea'}
        </Button>
      </div>
    </form>
  );
}
