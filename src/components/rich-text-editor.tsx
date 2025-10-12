
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
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
  Palette,
} from "lucide-react";
import { useCallback } from 'react';
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";

const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const currentColor = editor.getAttributes('textStyle').color || '';

  const toolbarButtons = [
    { command: () => editor.chain().focus().toggleBold().run(), icon: Bold, isActive: editor.isActive('bold'), label: "Negrito" },
    { command: () => editor.chain().focus().toggleItalic().run(), icon: Italic, isActive: editor.isActive('italic'), label: "Itálico" },
    { command: () => editor.chain().focus().toggleUnderline().run(), icon: UnderlineIcon, isActive: editor.isActive('underline'), label: "Sublinhado" },
    { command: () => editor.chain().focus().toggleStrike().run(), icon: Strikethrough, isActive: editor.isActive('strike'), label: "Tachado" },
    { type: 'divider' },
    { command: () => editor.chain().focus().setTextAlign('left').run(), icon: AlignLeft, isActive: editor.isActive({ textAlign: 'left' }), label: "Alinhar à Esquerda" },
    { command: () => editor.chain().focus().setTextAlign('center').run(), icon: AlignCenter, isActive: editor.isActive({ textAlign: 'center' }), label: "Centralizar" },
    { command: () => editor.chain().focus().setTextAlign('right').run(), icon: AlignRight, isActive: editor.isActive({ textAlign: 'right' }), label: "Alinhar à Direita" },
    { command: () => editor.chain().focus().setTextAlign('justify').run(), icon: AlignJustify, isActive: editor.isActive({ textAlign: 'justify' }), label: "Justificar" },
    { type: 'divider' },
    { command: () => editor.chain().focus().toggleBulletList().run(), icon: List, isActive: editor.isActive('bulletList'), label: "Lista" },
    { command: () => editor.chain().focus().toggleOrderedList().run(), icon: ListOrdered, isActive: editor.isActive('orderedList'), label: "Lista Numerada" },
    { type: 'divider' },
    { command: setLink, icon: Link2, isActive: editor.isActive('link'), label: "Inserir Link" },
    { command: () => { editor.chain().focus().unsetAllMarks().run(); editor.chain().focus().unsetColor().run(); }, icon: RemoveFormatting, isActive: false, label: "Remover Formatação" },
    { type: 'divider' },
    { command: () => editor.chain().focus().undo().run(), icon: Undo, isActive: false, label: "Desfazer", disabled: !editor.can().undo() },
    { command: () => editor.chain().focus().redo().run(), icon: Redo, isActive: false, label: "Refazer", disabled: !editor.can().redo() },
  ];

  return (
    <div className="border border-input rounded-t-md p-2 flex flex-wrap gap-1 bg-background">
      <Select
        defaultValue={editor.getAttributes('textStyle').fontFamily || 'PT Sans'}
        onValueChange={(value) => value && editor.chain().focus().setFontFamily(value).run()}
      >
        <SelectTrigger className="w-[150px] h-8 text-xs">
          <SelectValue placeholder="Fonte" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PT Sans">PT Sans</SelectItem>
          <SelectItem value="Playfair Display">Playfair Display</SelectItem>
        </SelectContent>
      </Select>
      
      <Popover>
        <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Cor do Texto" title="Cor do Texto">
                <Palette className="h-4 w-4" style={{ color: currentColor || 'inherit' }}/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
            <div className="flex gap-2 items-center">
                <Input
                    type="color"
                    className="h-8 w-8 p-1"
                    value={currentColor}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => editor.chain().focus().setColor(e.target.value).run()}
                />
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().unsetColor().run()}>
                    Resetar
                </Button>
            </div>
        </PopoverContent>
      </Popover>

      {toolbarButtons.map((btn, index) => {
         if (btn.type === 'divider') {
            return <div key={index} className="w-[1px] h-6 bg-border mx-1" />;
         }
         const { command, icon: Icon, isActive, label, disabled } = btn;
         return (
            <Button
                key={label}
                type="button"
                onClick={command}
                variant={isActive ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                aria-label={label}
                title={label}
                disabled={disabled}
            >
                <Icon className="h-4 w-4" />
            </Button>
         );
      })}
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
         // Desativar underline do starter-kit para usar a extensão dedicada
        underline: false,
      }),
      TextStyle,
      FontFamily,
      Color,
      Underline,
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
        class: "prose dark:prose-invert max-w-none w-full min-h-[200px] rounded-b-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 prose-p:my-2 prose-headings:my-4 prose-ul:my-2 prose-ol:my-2",
      },
    },
  });

  return (
    <div className="border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
