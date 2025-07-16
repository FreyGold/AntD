import type { JSX } from "react";
import { NavLink } from "react-router";

type Item = { key: string; icon: JSX.Element; label: string; path?: string };

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
      <NavLink
         to={item.path ? item.path : ""}
         className={`flex gap-6 cursor-pointer items-center px-3 py-2  h-12 rounded transition-colors ${
            selected
               ? "bg-orange-50 border-l-4 border-orange-500 text-primary w-48 "
               : "hover:bg-gray-200 hover:text-primary"
         }`}
         aria-disabled={item.key === "1" || item.key === "4" ? "true" : "false"}
         key={item.key}
         onClick={onClick}>
         {item.icon}
         <p>{item.label}</p>
      </NavLink>
   );
}

export default SidebarItem;
