import { LucideIcon } from 'lucide-react';

export interface ToolComponentProps {
  onBack: () => void;
}

export interface ToolMetadata {
  id: string;
  name: string;
  description: string;
  tags: string[];
  icon: string;
}

export interface Tool extends Omit<ToolMetadata, 'icon'> {
  icon: LucideIcon;
  component: React.ComponentType<ToolComponentProps>;
}

export interface ToolRegistry {
  [key: string]: Tool;
} 