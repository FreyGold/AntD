import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Plus } from "lucide-react";
import ModalForm from "./ModalForm";
import { Form } from "antd";
const ModalButton = ({ columnId }: { columnId?: string }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [form] = Form.useForm();

   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };

   const handleSubmit = () => {
      form
         .validateFields()
         .then((values) => {
            console.log("Form Data:", values);
            setIsModalOpen(false);
            // TODO: add mutation
         })
         .catch((info) => {
            console.log("Validation Failed:", info);
         });
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
            title="Add Task Form"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}>
            <ModalForm form={form} columnId={columnId} />
         </Modal>
      </>
   );
};

export default ModalButton;
