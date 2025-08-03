import { useState } from "react";
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
      icon: <AppstoreOutlined style={{ fontSize: "1.4rem" }} />,
      label: "Dashboard",
      path: "dashboard",
   },
   {
      key: "2",
      icon: <PieChartOutlined style={{ fontSize: "1.4rem" }} />,
      label: "Analytics",
   },
   {
      key: "3",
      icon: <HistoryOutlined style={{ fontSize: "1.4rem" }} />,
      label: "History",
   },
   {
      key: "4",
      icon: <CarryOutOutlined style={{ fontSize: "1.4rem" }} />,
      label: "To-Do",
      path: "dashboard/todo",
   },
   {
      key: "5",
      icon: <FormOutlined style={{ fontSize: "1.4rem" }} />,
      label: "Report",
   },
   {
      key: "6",
      icon: <SettingOutlined style={{ fontSize: "1.4rem" }} />,
      path: "dashboard/settings",
      label: "Settings",
   },
];

function Sidebar() {
   const [selectedKey, setSelectedKey] = useState("1");

   return (
      <aside className="px-6 py-12 flex h-full w-[18%] items-center flex-col">
         <h1 className="text-3xl text-text  font-bold">
            Task.<span className="text-primary font-[Poppins]">ai</span>
         </h1>
         <div className="flex gap-6 flex-col mt-14 items-start w-full">
            {items.map((item) => (
               <SidebarItem
                  key={item.key}
                  item={item}
                  selected={item.key === selectedKey}
                  onClick={() => setSelectedKey(item.key)}
               />
            ))}
         </div>
      </aside>
   );
}

export default Sidebar;
