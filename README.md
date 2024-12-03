# everything.app
NOTE: The project is deprecated and will no longer be updated. Deleted roughly like over 50 built-in tools since I don't want people to make profit off of this project. You can create your own tools.


The Everything.app project is a modular utility collection built with Next.js and TypeScript, designed to provide a flexible and extensible platform for various tools and utilities.

Each tool in the application is completely self-contained and follows a specific module structure. To create a new tool, you'll need to understand how the modular system works.
The core of the module system lives in the tools directory. Here's how to create a new tool:

First, create a new directory under src/tools with your tool name. Each tool requires two main components:
```
src/tools/your-tool/
  ├── metadata.json
  └── src/
      └── index.tsx
```

The ```metadata.json``` file defines your tool's properties:
```
{
  "id": "your-tool",
  "name": "Your Tool",
  "description": "What your tool does",
  "tags": ["category1", "category2"],
  "icon": "IconNameFromLucide"
}
```

Your main tool component goes in index.tsx and should follow this basic structure:
```
'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { ToolComponentProps } from '@/tools/types';

export default function YourTool({ onBack }: ToolComponentProps) {
  // Your tool implementation
  return (
    <ToolLayout 
      title="Your Tool"
      onBack={onBack}
    >
      {/* Your tool UI */}
    </ToolLayout>
  );
}
```

The system automatically discovers and registers new tools through the registry system. When the application starts, it scans the tools directory, loads the metadata, and makes the tools available through the search interface. Tools can use any React hooks or components, and have access to the shared components in the components directory. The ToolLayout component provides consistent navigation and styling across all tools. To test your new tool during development, run the development server with ```'npm run dev'``` and your tool will be automatically available through the search interface. The search system indexes your tool based on its name, description, and tags from the metadata file.

<img width="1920" alt="Screenshot 2024-12-03 at 20 23 48" src="https://github.com/user-attachments/assets/84ef3149-807d-49f9-90dc-6bdd23a933db">
<img width="1920" alt="Screenshot 2024-12-03 at 20 24 04" src="https://github.com/user-attachments/assets/dce127e1-f0dc-4011-b152-603c74c07e09">
<img width="1920" alt="Screenshot 2024-12-03 at 20 33 57" src="https://github.com/user-attachments/assets/3108d578-bbea-4743-a99a-69874969e1de">



