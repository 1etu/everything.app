'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { ToolComponentProps } from '@/tools/types';

export default function Base64DecoderTool({ onBack }: ToolComponentProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const decodeFromBase64 = (encoded: string) => {
    try {
      const decoded = atob(encoded.trim());
      setOutput(decoded);
    } catch (error) {
      setOutput('Error: Invalid Base64 input');
    }
  };

  return (
    <ToolLayout 
      title="Base64 Decoder"
      onBack={onBack}
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
            Base64 Input
          </label>
          <textarea
            id="input"
            className="w-full p-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 font-mono"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              decodeFromBase64(e.target.value);
            }}
            placeholder="Enter Base64 encoded text..."
            rows={4}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Decoded Output
          </label>
          <div className="p-4 bg-gray-50 rounded-xl text-sm break-all">
            {output || <span className="text-gray-400">Decoded text will appear here...</span>}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
} 