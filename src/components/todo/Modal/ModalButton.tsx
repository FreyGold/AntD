import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Plus } from "lucide-react";
import ModalForm from "./ModalForm";
import { Form } from "antd";
import { useCreateTask } from "@/services/hooks/tasks-react-query";
import { useAddColumnId } from "@/services/hooks/columns-react-query";
import type { ITask } from "@/services/types/ITask";
import dayjs from "dayjs";

interface ModalButtonProps {
   columnId?: string;
   [key: string]: any;
   type?: string;
}

type buttonType =
   | "text"
   | "link"
   | "default"
   | "primary"
   | "dashed"
   | undefined;

const ModalButton: React.FC<ModalButtonProps> = ({
   type,
   columnId,
   ...props
}) => {
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
      form.resetFields();
   };
   const handleSubmit = () => {
      form
         .validateFields()
         .then((values) => {
            console.log(values);
            // TALK about dayjs and manipulating form values
            values.date = dayjs(values.date).format("YY MMM 'YY");
            values.assignee.initials =
               values.assignee?.name
                  .split(" ")
                  .map((Initial) => Initial[0])
                  .join("")
                  .toUpperCase() ?? "";
            setIsModalOpen(false);
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
         {!type && (
            <Button
               type={buttonType}
               style={{ color: "var(--c-primary)" }}
               onClick={showModal}
               {...props}>
               <Plus className="w-4 h-4 mr-1" />
               Add Task
            </Button>
         )}
         {type && (
            <Plus
               onClick={showModal}
               className="cursor-pointer hover:text-text/100 hover:scale-120 transition-transform"
            />
         )}
         <Modal
            title="Add Task Form"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            width={"600px"}
            onOk={handleSubmit}
            onCancel={handleCancel}>
            <ModalForm form={form} columnId={columnId} />
         </Modal>
      </>
   );
};

export default ModalButton;
