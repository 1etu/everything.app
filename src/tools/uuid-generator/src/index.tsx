'use client';

import { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import ToolLayout from '@/components/ToolLayout';
import { ToolComponentProps } from '@/tools/types';

export default function UUIDGeneratorTool({ onBack }: ToolComponentProps) {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUUIDs = () => {
    const newUUIDs = Array(count).fill(null).map(() => generateUUID());
    setUuids(newUUIDs);
  };

  const copyToClipboard = async (uuid: string) => {
    await navigator.clipboard.writeText(uuid);
  };

  const copyAllToClipboard = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <ToolLayout 
      title="UUID Generator"
      onBack={onBack}
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-600">
            Number of UUIDs
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="20" 
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 text-base"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button 
                onClick={() => setCount(prev => Math.min(prev + 1, 20))}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                +
              </button>
              <button
                onClick={() => setCount(prev => Math.max(prev - 1, 1))}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                -
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={generateUUIDs}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Generate UUIDs
          </button>
          {uuids.length > 0 && (
            <button
              onClick={copyAllToClipboard}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Copy size={16} />
              Copy All
            </button>
          )}
        </div>

        {uuids.length > 0 && (
          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div key={index} className="relative group">
                <div className="p-3 bg-gray-50 rounded-lg font-mono text-sm break-all pr-12">
                  {uuid}
                  <button
                    onClick={() => copyToClipboard(uuid)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded-lg transition-all"
                    title="Copy to clipboard"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
} 