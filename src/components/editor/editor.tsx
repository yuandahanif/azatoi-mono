/* eslint-disable @next/next/no-img-element */
import {
  type RenderElementProps,
  ReactEditor,
  type RenderLeafProps,
  useSlateStatic,
} from "slate-react";
import React, { type ChangeEvent, useCallback, useMemo } from "react";
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
          console.log("file: editor.tsx:92 ~ toggleBoldMark ~ n:", n);
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
  setValue?: (e: ChangeEvent<HTMLDivElement>) => void;
  defaultValue?: Descendant[];
}> = ({ setValue, defaultValue }) => {
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  const editor = useMemo(
    () => withReact(withImages(withHistory(createEditor()))),
    []
  );

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element?.type) {
      case "link":
        return <LinkElement {...props} />;
      case "image":
        return <ImageElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div className="min-h-[500px] w-full">
      <Slate editor={editor} value={defaultValue ?? initialValue}>
        <div className="mb-2 flex gap-x-4 ml-auto w-full justify-end">
          {/* <button
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
            }}
          >
            Bold
          </button>

          <button
            onMouseDown={(event) => {
              event.preventDefault();
              const url = window.prompt("Tautan:");
              if (url && !isUrl(url)) {
                alert("Error: invalid url");
                return;
              }

              url && CustomEditor.toggleLink(editor, url);
            }}
          >
            Tautan
          </button> */}

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
          className="min-h-[500px] bg-white p-3 shadow-sm"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onChange={(value) => {
            setValue && setValue(value);
          }}
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
  const image: ImageElement = { type: "image", url, children: [text] };
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
  console.log("file: editor.tsx:267 ~ elm:", elm);

  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} className="relative">
        <img
          src={elm.url}
          className="block h-96 w-fit object-contain focus:shadow-lg"
          alt={elm.url}
        />
        <button
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className="absolute top-2 left-2 inline-block bg-white text-black"
        >
          <span>delete</span>
        </button>
      </div>
    </div>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const LinkElement = (props: RenderElementProps) => {
  const elm: LinkElement = props.element as LinkElement;
  console.log("file: editor.tsx:294 ~ LinkElement ~ elm:", elm);

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
