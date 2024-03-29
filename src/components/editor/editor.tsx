/* eslint-disable @next/next/no-img-element */
import {
  type RenderElementProps,
  ReactEditor,
  type RenderLeafProps,
  useSlateStatic,
} from "slate-react";
import escapeHtml from "escape-html";
import React, { useCallback, useMemo } from "react";
import {
  type BaseEditor,
  createEditor,
  type Descendant,
  Transforms,
  Editor,
  Text,
} from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { type HistoryEditor, withHistory } from "slate-history";
import imageExtensions from "image-extensions";
import isUrl from "is-url";

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type CodeElement = {
  type: "code";
  children: CustomText[];
};
export type LinkElement = {
  type: "link";
  href: string;
  children: CustomText[];
};

export type ImageElement = {
  url: string;
  readonly: boolean;
  type: "image";
  children: CustomText[];
};

export type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};

type CustomElement =
  | null
  | ParagraphElement
  | HeadingElement
  | CodeElement
  | ImageElement
  | LinkElement;

type CustomText = { text: string; bold?: boolean };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => (n as CustomText)?.bold == true,
      universal: true,
    });

    return !!match;
  },
  isLinkBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => (n as CustomElement)?.type == "link",
      universal: true,
    });

    return !!match;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isLinkBlockActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      {
        match: (n) => {
          return Text.isText(n);
        },
        split: true,
      }
    );
  },

  toggleLink(editor: Editor, href: string) {
    const isActive = CustomEditor.isLinkBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "link", href },
      { match: (n) => Editor.isBlock(editor, n as CustomElement) }
    );
  },
};

const RichEditor: React.FC<{
  setValue?: (e: string) => void;
  defaultValue?: Descendant[] | string;
  readonly?: boolean;
  className?: string;
}> = ({ setValue, defaultValue, readonly = false, className }) => {
  const initialValue: Descendant[] = useMemo(
    () =>
      ((defaultValue &&
        JSON.parse(defaultValue as string)) as Descendant[]) || [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
    [defaultValue]
  );

  const editor = useMemo(
    () => withReact(withImages(withHistory(createEditor()))),
    []
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => {
      switch (props.element?.type) {
        case "link":
          return <LinkElement {...props} />;
        case "image":
          return readonly ? (
            <ImageElementReadOnly {...props} />
          ) : (
            <ImageElement {...props} />
          );
        default:
          return <DefaultElement {...props} />;
      }
    },
    [readonly]
  );

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  if (readonly) {
    return (
      <div className="w-full">
        <Slate editor={editor} value={initialValue}>
          <Editable
            readOnly
            className={className}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Slate>
      </div>
    );
  }

  return (
    <div className="min-h-[300px] w-full">
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );

          if (isAstChange) {
            const content = JSON.stringify(value);
            setValue && setValue(content);
          }
        }}
      >
        <div className="mb-2 ml-auto flex w-full justify-end gap-x-4">
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              const url = window.prompt("Tautan gambar:");
              if (url && !isImageUrl(url)) {
                alert("URL is not an image");
                return;
              }
              url && insertImage(editor, url);
            }}
          >
            <span>+ Gambar</span>
          </button>
        </div>

        <Editable
          className="min-h-[300px] bg-white p-3 shadow-sm"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              case "b": {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
                break;
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

const insertImage = (editor: Editor, url: string) => {
  const text = { text: "\n" };
  const image: ImageElement = {
    type: "image",
    url,
    children: [text],
    readonly: false,
  };
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  });
};

const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext ?? "");
};

const withImages = (editor: Editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element?.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, String(url) ?? "");
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const ImageElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const elm: ImageElement = (element as ImageElement) ?? {
    children: [],
    url: "https://media.discordapp.net/attachments/1026030592774639616/1076181300123279511/blob_https___waifus.nemusona.com_b7d54a79-5051-4c26-a0ae-12d732bb384e.png?width=448&height=448",
    type: "image",
  };

  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} className="relative">
        <img
          src={elm.url}
          className="block h-96 w-fit object-contain focus:shadow-lg"
          alt={elm.url}
        />
        {!elm.readonly && (
          <button
            onClick={() => Transforms.removeNodes(editor, { at: path })}
            className="absolute top-2 left-2 inline-block bg-white text-black"
          >
            <span>delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

const ImageElementReadOnly = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const elm: ImageElement = (element as ImageElement) ?? {
    children: [],
    url: "https://media.discordapp.net/attachments/1026030592774639616/1076181300123279511/blob_https___waifus.nemusona.com_b7d54a79-5051-4c26-a0ae-12d732bb384e.png?width=448&height=448",
    type: "image",
  };

  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} className="relative">
        <img
          src={elm.url}
          className="block h-96 w-fit object-contain focus:shadow-lg"
          alt={elm.url}
        />
      </div>
    </div>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const LinkElement = (props: RenderElementProps) => {
  const elm: LinkElement = props.element as LinkElement;

  return (
    <a {...props.attributes} className="text-sky-500 underline" href={elm.href}>
      {props.children}
    </a>
  );
};

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

export default RichEditor;
