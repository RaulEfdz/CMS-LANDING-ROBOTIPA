'use client';

import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

type TagSelectorProps = {
  predefinedTags: { id: string; label: string; colorClass: string }[];
  onTagsChange: (tags: string[]) => void;
  onCustomTagsChange: (tags: string[]) => void;
};

export function TagSelector({ 
  predefinedTags, 
  onTagsChange, 
  onCustomTagsChange 
}: TagSelectorProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
      
    setSelectedTags(newTags);
    onTagsChange(newTags);
  };

  const addCustomTag = (tag: string) => {
    if (tag && !customTags.includes(tag)) {
      const newTags = [...customTags, tag];
      setCustomTags(newTags);
      onCustomTagsChange(newTags);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {predefinedTags.map(tag => (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggleTag(tag.id)}
            className={`${tag.colorClass} rounded-full px-4 py-2 flex items-center ${
              selectedTags.includes(tag.id) ? 'ring-2 ring-primary' : ''
            }`}
          >
            {selectedTags.includes(tag.id) && <Check className="mr-2 h-4 w-4" />}
            {tag.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Input
          placeholder="Add custom tag..."
          onKeyDown={e => {
            if (e.key === 'Enter') {
              addCustomTag(e.currentTarget.value.trim());
              e.currentTarget.value = '';
            }
          }}
        />
        <Plus className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}