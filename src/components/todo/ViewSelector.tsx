import React from "react";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Segmented } from "antd";

const ViewSelector: React.FC = () => (
   <Segmented
      options={[
         { value: "List", icon: <BarsOutlined /> },
         { value: "Kanban", icon: <AppstoreOutlined /> },
      ]}
   />
);

export default ViewSelector;
