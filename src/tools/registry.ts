"use client";

import { LucideIcon } from 'lucide-react';
import { Tool, ToolRegistry, ToolMetadata } from './types';
import * as icons from 'lucide-react';

export let toolsRegistry: ToolRegistry = {};

let isInitialized = false;

async function importToolComponent(toolId: string) {
  try {
    const module = await import(`@/tools/${toolId}/src`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load tool component: ${toolId}`, error);
    return null;
  }
}

export async function initializeTools() {
  if (isInitialized) return;
  
  try {
    const response = await fetch('/api/tools');
    const toolsMetadata: ToolMetadata[] = await response.json();
    console.log('Loaded tools metadata:', toolsMetadata);

    for (const metadata of toolsMetadata) {
      try {
        const component = await importToolComponent(metadata.id);
        console.log(`Loaded component for ${metadata.id}:`, component);
        if (!component) continue;

        const icon = icons[metadata.icon as keyof typeof icons];
        if (!icon) {
          console.error(`Icon not found: ${metadata.icon}`);
          continue;
        }

        toolsRegistry[metadata.id] = {
          ...metadata,
          icon: icon as LucideIcon,
          component
        };
      } catch (error) {
        console.error(`Failed to load tool: ${metadata.id}`, error);
      }
    }
    
    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize tools:', error);
  }
}

export async function searchTools(query: string): Promise<Tool[]> {
  await initializeTools();
  
  const lowercaseQuery = query.toLowerCase();
  
  if (!lowercaseQuery) {
    return Object.values(toolsRegistry);
  }
  
  return Object.values(toolsRegistry).filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export async function getTool(id: string): Promise<Tool | undefined> {
  await initializeTools();
  return toolsRegistry[id];
}