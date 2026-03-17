# Tiptap Rich Text Editor Setup

## Overview

The News CRUD system now uses Tiptap, a modern rich text editor for React. This document explains how to install and use it.

## Installation

You need to install the following Tiptap packages:

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder
```

Or using yarn:

```bash
yarn add @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder
```

## Package Details

- **@tiptap/react** - React wrapper for Tiptap
- **@tiptap/starter-kit** - Bundle of essential extensions (bold, italic, headings, lists, etc.)
- **@tiptap/extension-image** - Support for images in the editor
- **@tiptap/extension-link** - Support for hyperlinks
- **@tiptap/extension-placeholder** - Placeholder text when editor is empty

## Component Location

The Tiptap editor component is located at: `app/components/TiptapEditor.tsx`

## Features

The Tiptap editor provides:

1. **Text Formatting**
   - Bold, Italic, Strikethrough
2. **Headings**
   - H1, H2, H3
   - Paragraph formatting
3. **Lists**
   - Bullet lists
   - Numbered lists
4. **Block Elements**
   - Blockquotes
   - Horizontal rules
5. **Interactive Elements**
   - Links (with prompt for URL)
   - Images (with prompt for URL)
6. **History**
   - Undo/Redo functionality

## Usage in Dashboard

The component is already integrated into the News modal form in `app/admin/dashboard/page.tsx`:

```tsx
<TiptapEditor
  content={newsFormData.content}
  onChange={(content) =>
    setNewsFormData({
      ...newsFormData,
      content,
    })
  }
  placeholder="Write your news article content here..."
/>
```

## After Installation

Once you've installed the packages:

1. The Tiptap editor will automatically work in the News modal
2. You'll see a toolbar with all formatting options
3. The editor content is saved as HTML in the Firebase database
4. The HTML can be safely rendered on your frontend pages

## Styling

The component includes built-in styles that match your dashboard theme. The editor has:

- Clean, modern interface
- Toolbar with visual feedback
- Responsive design
- Hover states and active states for buttons
- Proper spacing and typography

## Alternative: Keep ContentEditable

If you prefer not to use Tiptap, the native contentEditable implementation with document.execCommand is also available. To revert:

1. Don't install the Tiptap packages
2. Replace the `<TiptapEditor />` component in the News modal with the contentEditable div
3. Remove the Tiptap import from dashboard page

The native implementation supports:

- Bold, Italic, Underline
- H2, H3 headings
- Bullet lists

Choose Tiptap for a better user experience and more features, or stick with contentEditable for simplicity and zero dependencies.
