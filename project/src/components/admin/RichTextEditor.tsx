import { useEffect, type ReactNode } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link2,
  ImageIcon,
  Undo2,
  Redo2,
  Unlink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminUploadImage } from "@/lib/api";
import { toast } from "sonner";

type ToolButtonProps = {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: ReactNode;
};

function ToolButton({ active, onClick, title, children }: ToolButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "h-9 w-9 rounded-lg flex items-center justify-center transition-colors",
        active ? "bg-gradient-swoosh text-white" : "hover:bg-accent text-foreground/80",
      )}
    >
      {children}
    </button>
  );
}

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
};

export default function RichTextEditor({ value, onChange, disabled }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-slate prose-lg max-w-none prose-headings:font-display prose-a:text-secondary min-h-[280px] focus:outline-none px-4 py-3",
      },
    },
  });

  // Sync external value changes (e.g. loading an article for editing).
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  const pickAndUpload = async (insert: (url: string) => void) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp,image/gif";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const res = await adminUploadImage(file);
        insert(res.url);
      } catch (e) {
        toast.error((e as Error).message);
      }
    };
    input.click();
  };

  return (
    <div className={cn("border border-input rounded-xl overflow-hidden bg-background", disabled && "opacity-60 pointer-events-none")}>
      <div className="flex flex-wrap items-center gap-1 border-b border-border px-2 py-1.5 bg-muted/40">
        <ToolButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
          <Bold className="h-4 w-4" />
        </ToolButton>
        <ToolButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
          <Italic className="h-4 w-4" />
        </ToolButton>
        <ToolButton active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
          <Strikethrough className="h-4 w-4" />
        </ToolButton>
        <span className="w-px h-5 bg-border mx-1" />
        <ToolButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </ToolButton>
        <ToolButton active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </ToolButton>
        <span className="w-px h-5 bg-border mx-1" />
        <ToolButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">
          <List className="h-4 w-4" />
        </ToolButton>
        <ToolButton active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">
          <ListOrdered className="h-4 w-4" />
        </ToolButton>
        <ToolButton active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">
          <Quote className="h-4 w-4" />
        </ToolButton>
        <ToolButton active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code block">
          <Code className="h-4 w-4" />
        </ToolButton>
        <span className="w-px h-5 bg-border mx-1" />
        <ToolButton
          active={editor.isActive("link")}
          onClick={() => {
            const prev = editor.getAttributes("link").href as string | undefined;
            const url = window.prompt("Link URL", prev ?? "https://");
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
          title="Insert link"
        >
          <Link2 className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}
          title="Remove link"
        >
          <Unlink className="h-4 w-4" />
        </ToolButton>
        <ToolButton
          onClick={() => pickAndUpload((url) => editor.chain().focus().setImage({ src: url }).run())}
          title="Insert image"
        >
          <ImageIcon className="h-4 w-4" />
        </ToolButton>
        <span className="w-px h-5 bg-border mx-1" />
        <ToolButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo2 className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo2 className="h-4 w-4" />
        </ToolButton>
      </div>
      <EditorContent editor={editor} />
      <p className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
        Use the toolbar to format. Select text to make it <strong>bold</strong>, <em>italic</em>, headings, lists, quotes, links and images are supported.
      </p>
    </div>
  );
}