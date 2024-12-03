import { promises as fs } from 'fs';
import path from 'path';
import { ToolMetadata } from '@/tools/types';

export async function GET() {
  try {
    const toolsDir = path.join(process.cwd(), 'src', 'tools');
    const dirs = await fs.readdir(toolsDir, { withFileTypes: true });
    const toolDirs = dirs.filter(dir => dir.isDirectory());

    const tools: ToolMetadata[] = [];

    for (const dir of toolDirs) {
      try {
        const metadataPath = path.join(toolsDir, dir.name, 'metadata.json');
        const metadataContent = await fs.readFile(metadataPath, 'utf-8');
        const metadata: ToolMetadata = JSON.parse(metadataContent);
        tools.push(metadata);
      } catch (error) {
        console.error(`Failed to load tool metadata: ${dir.name}`, error);
      }
    }

    return Response.json(tools);
  } catch (error) {
    console.error('Failed to load tools:', error);
    return Response.error();
  }
} 