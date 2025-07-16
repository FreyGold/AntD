import React, { useState } from "react";
import {
   AppstoreOutlined,
   CarryOutOutlined,
   FormOutlined,
   HistoryOutlined,
   PieChartOutlined,
   SettingOutlined,
} from "@ant-design/icons";
import SidebarItem from "./SidebarItem";

const items = [
   {
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
      path: "dashboard",
   },
   { key: "2", icon: <PieChartOutlined />, label: "Analytics" },
   { key: "3", icon: <HistoryOutlined />, label: "History" },
   { key: "4", icon: <CarryOutOutlined />, label: "To-Do", path: "todo" },
   { key: "5", icon: <FormOutlined />, label: "Report" },
   { key: "6", icon: <SettingOutlined />, label: "Settings" },
];

function Sidebar() {
   const [selectedKey, setSelectedKey] = useState("1");

   return (
      <div className="p-6 py-12 flex h-full w-[18%] items-center flex-col">
         <h1 className="text-3xl text-text  font-bold">
            Task.<span className="text-primary font-[Poppins]">ai</span>
         </h1>
         <div className="flex gap-6 flex-col mt-12">
            {items.map((item) => (
               <SidebarItem
                  key={item.key}
                  item={item}
                  selected={item.key === selectedKey}
                  onClick={() => setSelectedKey(item.key)}
               />
            ))}
         </div>
      </div>
   );
}

export default Sidebar;
