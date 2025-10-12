"use client";

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link2,
  Undo,
  Redo,
  RemoveFormatting,
} from "lucide-react";
import { useCallback } from 'react';
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const toolbarButtons = [
    { command: () => editor.chain().focus().toggleBold().run(), icon: Bold, isActive: editor.isActive('bold'), label: "Negrito" },
    { command: () => editor.chain().focus().toggleItalic().run(), icon: Italic, isActive: editor.isActive('italic'), label: "Itálico" },
    { command: () => editor.chain().focus().toggleUnderline().run(), icon: Underline, isActive: editor.isActive('underline'), label: "Sublinhado" },
    { command: () => editor.chain().focus().toggleStrike().run(), icon: Strikethrough, isActive: editor.isActive('strike'), label: "Tachado" },
    { command: () => editor.chain().focus().setTextAlign('left').run(), icon: AlignLeft, isActive: editor.isActive({ textAlign: 'left' }), label: "Alinhar à Esquerda" },
    { command: () => editor.chain().focus().setTextAlign('center').run(), icon: AlignCenter, isActive: editor.isActive({ textAlign: 'center' }), label: "Centralizar" },
    { command: () => editor.chain().focus().setTextAlign('right').run(), icon: AlignRight, isActive: editor.isActive({ textAlign: 'right' }), label: "Alinhar à Direita" },
    { command: () => editor.chain().focus().setTextAlign('justify').run(), icon: AlignJustify, isActive: editor.isActive({ textAlign: 'justify' }), label: "Justificar" },
    { command: () => editor.chain().focus().toggleBulletList().run(), icon: List, isActive: editor.isActive('bulletList'), label: "Lista" },
    { command: () => editor.chain().focus().toggleOrderedList().run(), icon: ListOrdered, isActive: editor.isActive('orderedList'), label: "Lista Numerada" },
    { command: setLink, icon: Link2, isActive: editor.isActive('link'), label: "Inserir Link" },
    { command: () => editor.chain().focus().unsetAllMarks().run(), icon: RemoveFormatting, isActive: false, label: "Remover Formatação" },
    { command: () => editor.chain().focus().undo().run(), icon: Undo, isActive: false, label: "Desfazer" },
    { command: () => editor.chain().focus().redo().run(), icon: Redo, isActive: false, label: "Refazer" },
  ];

  return (
    <div className="border border-input rounded-t-md p-2 flex flex-wrap gap-1 bg-background">
      {toolbarButtons.map(({ command, icon: Icon, isActive, label }) => (
        <Button
          key={label}
          type="button"
          onClick={command}
          variant={isActive ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          aria-label={label}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
};

interface RichTextEditorProps {
  value: string;
  onChange: (richText: string) => void;
  disabled?: boolean;
}

export default function RichTextEditor({ value, onChange, disabled }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // starter kit configuration
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable: !disabled,
    editorProps: {
      attributes: {
        class: cn(
          "prose dark:prose-invert max-w-none w-full min-h-[200px] rounded-b-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "prose-p:my-2 prose-headings:my-4"
        ),
      },
    },
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}