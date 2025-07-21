import { SearchOutlined } from "@ant-design/icons";
import { Input as AntDInput } from "antd";
import { useState } from "react";

function Input() {
   const [isOpen, setIsOpen] = useState(false);
   const width = isOpen ? "20rem" : "12rem";
   // Generalize the component
   return (
      <AntDInput
         placeholder="Search for something..."
         type="text"
         variant="borderless"
         prefix={<SearchOutlined className="mx-1" />}
         onFocus={() => setIsOpen(true)}
         onBlur={() => setIsOpen(false)}
         style={{
            width: width,
            backgroundColor: "var(--c-background-dark)",
            borderRadius: "2rem",
            height: "110%",
            transition: "width 300ms ease-in-out",
         }}
         // is this a correct approach?
      />
   );
}

export default Input;
