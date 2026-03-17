"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({
  content,
  onChange,
  placeholder = "Start writing...",
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="tiptap-container">
      {/* Toolbar */}
      <div className="tiptap-toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
        <span className="separator">|</span>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
          title="Paragraph"
        >
          P
        </button>
        <span className="separator">|</span>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          title="Numbered List"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
          title="Blockquote"
        >
          &ldquo;&rdquo;
        </button>
        <span className="separator">|</span>
        <button type="button" onClick={setLink} title="Add Link">
          🔗 Link
        </button>
        <button type="button" onClick={addImage} title="Add Image">
          🖼️ Image
        </button>
        <span className="separator">|</span>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          ―
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          ↷
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      <style jsx global>{`
        .tiptap-container {
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          overflow: hidden;
        }

        .tiptap-toolbar {
          display: flex;
          gap: 0.25rem;
          padding: 0.5rem;
          background: #f8fafc;
          border-bottom: 1px solid #cbd5e1;
          flex-wrap: wrap;
          align-items: center;
        }

        .tiptap-toolbar button {
          padding: 0.375rem 0.625rem;
          font-size: 0.875rem;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }

        .tiptap-toolbar button:hover:not(:disabled) {
          background: #e2e8f0;
          border-color: #94a3b8;
        }

        .tiptap-toolbar button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .tiptap-toolbar button.is-active {
          background: #0b2e48;
          color: #ffffff;
          border-color: #0b2e48;
        }

        .tiptap-toolbar .separator {
          color: #cbd5e1;
          margin: 0 0.25rem;
        }

        .tiptap-editor {
          padding: 1rem;
          min-height: 200px;
          max-height: 400px;
          overflow-y: auto;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #1e293b;
        }

        .tiptap-editor:focus {
          outline: none;
        }

        .tiptap-editor .ProseMirror {
          outline: none;
        }

        .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
          color: #94a3b8;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        .tiptap-editor h1 {
          font-size: 2em;
          font-weight: 700;
          margin: 0.5em 0;
          line-height: 1.2;
        }

        .tiptap-editor h2 {
          font-size: 1.5em;
          font-weight: 600;
          margin: 0.5em 0;
          line-height: 1.3;
        }

        .tiptap-editor h3 {
          font-size: 1.25em;
          font-weight: 600;
          margin: 0.5em 0;
          line-height: 1.4;
        }

        .tiptap-editor ul,
        .tiptap-editor ol {
          padding-left: 1.5rem;
          margin: 0.5em 0;
        }

        .tiptap-editor li {
          margin: 0.25em 0;
        }

        .tiptap-editor blockquote {
          border-left: 3px solid #0b2e48;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #475569;
        }

        .tiptap-editor a {
          color: #0b2e48;
          text-decoration: underline;
          cursor: pointer;
        }

        .tiptap-editor a:hover {
          color: #1e40af;
        }

        .tiptap-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .tiptap-editor hr {
          border: none;
          border-top: 2px solid #e2e8f0;
          margin: 1.5rem 0;
        }

        .tiptap-editor code {
          background: #f1f5f9;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: "Courier New", monospace;
          font-size: 0.9em;
        }

        .tiptap-editor pre {
          background: #1e293b;
          color: #f1f5f9;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .tiptap-editor pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
