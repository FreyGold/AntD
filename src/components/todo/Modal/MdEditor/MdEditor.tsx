import { useState } from "react";
import {
   MDXEditor,
   toolbarPlugin,
   headingsPlugin,
   listsPlugin,
   quotePlugin,
   linkPlugin,
   imagePlugin,
   codeBlockPlugin,
   thematicBreakPlugin,
   tablePlugin,
   diffSourcePlugin,
   UndoRedo,
   BoldItalicUnderlineToggles,
   CodeToggle,
   BlockTypeSelect,
   CreateLink,
   InsertImage,
   ListsToggle,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export default function MdEditor() {
   const [markdownContent, setMarkdownContent] = useState(
      "**Hello world!**\n\nThis is a *simple* MDX editor.\n\n- Item 1\n- Item 2\n\n```javascript\nconsole.log('Hello from code block');\n```\n\n> A blockquote example.\n\n---"
   );

   return (
      <div className="mdx-editor-container" data-color-mode="light">
         <MDXEditor
            markdown={markdownContent}
            onChange={setMarkdownContent}
            plugins={[
               toolbarPlugin({
                  toolbarContents: () => (
                     <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <CodeToggle />
                        <BlockTypeSelect />
                        <CreateLink />
                        <InsertImage />
                        <ListsToggle />
                     </>
                  ),
               }),
               headingsPlugin(),
               listsPlugin(),
               quotePlugin(),
               linkPlugin(),
               imagePlugin({
                  imageUploadHandler: async (image) => {
                     return Promise.resolve(
                        "https://via.placeholder.com/300x200"
                     );
                  },
               }),
               codeBlockPlugin({ defaultCodeBlockLanguage: "javascript" }),
               thematicBreakPlugin(),
               tablePlugin(),
               diffSourcePlugin(),
            ]}
         />
      </div>
   );
}
