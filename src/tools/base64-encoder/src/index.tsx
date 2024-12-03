'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { ToolComponentProps } from '@/tools/types';

export default function Base64EncoderTool({ onBack }: ToolComponentProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encodeToBase64 = (text: string) => {
    try {
      const encoded = btoa(text);
      setOutput(encoded);
    } catch (error) {
      setOutput('Error: Invalid input for Base64 encoding');
    }
  };

  return (
    <ToolLayout 
      title="Base64 Encoder"
      onBack={onBack}
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
            Input Text
          </label>
          <textarea
            id="input"
            className="w-full p-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              encodeToBase64(e.target.value);
            }}
            placeholder="Enter text to encode..."
            rows={4}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base64 Output
          </label>
          <div className="p-4 bg-gray-50 rounded-xl font-mono text-sm break-all">
            {output || <span className="text-gray-400">Base64 encoded text will appear here...</span>}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
} 