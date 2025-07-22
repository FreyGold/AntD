import React from "react";
import MDEditor from "@uiw/react-md-editor";

export default function MdEditor() {
   const [value, setValue] = React.useState("**Hello world!!!**");
   return (
      <div className="" data-color-mode="light">
         {/* <MDEditor value={value} onChange={setValue} /> */}
      </div>
   );
}
// TODO: Unfinished
