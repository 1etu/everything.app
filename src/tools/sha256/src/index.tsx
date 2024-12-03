'use client';

import { useState } from 'react';
import crypto from 'crypto';
import ToolLayout from '@/components/ToolLayout';
import { ToolComponentProps } from '@/tools/types';

export default function SHA256Tool({ onBack }: ToolComponentProps) {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  const generateHash = (text: string) => {
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    setHash(hash);
  };

  return (
    <ToolLayout 
      title="SHA256 Hash Generator"
      onBack={onBack}
    >
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <div>
          <textarea
            id="input"
            className="w-full p-6 rounded-3xl bg-gray-50/30 
              focus:outline-none placeholder:text-gray-300
              text-lg transition-all"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              generateHash(e.target.value);
            }}
            placeholder="Type or paste text..."
            rows={4}
          />
        </div>
        
        {hash && (
          <div className="rounded-3xl bg-gray-50/30 p-6">
            <p className="font-mono text-lg text-gray-600 break-all">{hash}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
} 