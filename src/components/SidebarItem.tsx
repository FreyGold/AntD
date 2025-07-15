import type { JSX } from "react";

type Item = { key: string; icon: JSX.Element; label: string };

function SidebarItem({
   item,
   selected,
   onClick,
}: {
   item: Item;
   selected?: boolean;
   onClick?: () => void;
}) {
   return (
      <div
         className={`flex gap-6 cursor-pointer items-center px-3 py-2  h-12 rounded transition-colors ${
            selected
               ? "bg-orange-50 border-l-4 border-orange-500 text-orange-700 w-48 "
               : "hover:bg-gray-200"
         }`}
         key={item.key}
         onClick={onClick}>
         {item.icon}
         <p>{item.label}</p>
      </div>
   );
}

export default SidebarItem;
