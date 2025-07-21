import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Plus } from "lucide-react";
import ModalForm from "./ModalForm";
import { Form } from "antd";
import {
   useCreateTask,
   useUpdateTask,
} from "@/services/hooks/tasks-react-query";
import {
   useAddColumnId,
   useUpdateColumn,
} from "@/services/hooks/columns-react-query";
import type { ITask } from "@/services/types/ITask";

interface ModalButtonProps {
   columnId?: string;
   [key: string]: any;
}

type buttonType =
   | "text"
   | "link"
   | "default"
   | "primary"
   | "dashed"
   | undefined;

const ModalButton: React.FC<ModalButtonProps> = ({ columnId, ...props }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [form] = Form.useForm<ITask>();

   const { mutate: mutateTask } = useCreateTask();
   const { mutate: mutateColumn } = useAddColumnId();

   const buttonType: buttonType =
      { ...props }.length === 0 ? undefined : "text";
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
            setIsModalOpen(false);
            // TODO: add mutation
            mutateTask(values);
            mutateColumn({ id: values.id, type: values.type });
            form.resetFields();
         })
         .catch((info) => {
            console.log("Validation Failed:", info);
         });
   };

   return (
      <>
         <Button
            type={buttonType}
            style={{ color: "var(--c-primary)" }}
            onClick={showModal}
            {...props}>
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
