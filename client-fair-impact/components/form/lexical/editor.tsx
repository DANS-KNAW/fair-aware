import { ParagraphNode, TextNode } from "lexical";
import ToolbarPlugin from "./toolbar-plugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import HtmlPlugin from "./html-plugin";

interface EditorProps {
  namespace: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({
  namespace,
  placeholder = "",
  value,
  onChange,
}: EditorProps) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace,
        nodes: [
          ParagraphNode,
          TextNode,
          HeadingNode,
          QuoteNode,
          ListNode,
          ListItemNode,
          CodeNode,
          LinkNode,
        ],
        onError: (error: Error) => {
          console.error("Lexical Editor Error:", error);
        },
        theme: {
          link: "text-fair_dark_blue-600 hover:text-fair_dark_blue-600 cursor-pointer",
          text: {
            bold: "font-bold",
            italic: "italic",
            strikethrough: "line-through",
            underline: "underline",
            underlineStrikethrough: "[text-decoration:underline_line-through]",
          },
        },
      }}
    >
      <div className="relative">
        <ToolbarPlugin />
        <div className="relative bg-white">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="prose min-h-32 min-w-full rounded-b-lg border-x border-b border-gray-300 p-2"
                aria-placeholder={placeholder}
                placeholder={<p>{placeholder}</p>}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <LinkPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <HtmlPlugin onHtmlChanged={onChange} initialHtml={value} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
