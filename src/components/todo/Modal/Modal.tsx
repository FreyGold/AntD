import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Plus } from "lucide-react";

const ModalButton: React.FC = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleOk = () => {
      setIsModalOpen(false);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };

   return (
      <>
         <Button
            type="text"
            style={{ color: "var(--c-primary)" }}
            onClick={showModal}>
            <Plus className="w-4 h-4 mr-1" />
            Add Task
         </Button>
         <Modal
            title="Basic Modal"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
         </Modal>
      </>
   );
};

export default ModalButton;
