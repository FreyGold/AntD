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
      <button
         className={`rounded w-full ${
            selected
               ? "bg-orange-50 border-l-4 border-primary text-primary "
               : "hover:bg-gray-200 hover:text-primary hover:border-l-4 "
         }`}>
         <NavLink
            to={item.path ? item.path : ""}
            className={` flex cursor-pointer items-center ml-5 gap-6 px-3 py-2 h-10 `}
            key={item.key}
            onClick={onClick}>
            {item.icon}
            <p>{item.label}</p>
         </NavLink>
      </button>
   );
}

export default SidebarItem;
