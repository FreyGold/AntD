import React, { useState } from "react";
import { Modal } from "antd";
import EditTaskModal from "./EditTaskModal";
import { Form } from "antd";
import { useUpdateTask } from "@/services/hooks/tasks-react-query";
import type { ISubtask, ITask } from "@/services/types/ITask";
import dayjs from "dayjs";

interface EditTaskModalButtonProps {
   task: ITask;
   icon: React.ReactNode;
   className?: string;
   [key: string]: any;
}

const EditTaskModalButton: React.FC<EditTaskModalButtonProps> = ({
   task,
   icon,
   className = "",
   ...props
}) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [form] = Form.useForm();

   const { mutate: mutateTask } = useUpdateTask();

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
            console.log("Form values before processing:", values);

            if (values.date) {
               const dateValue = dayjs.isDayjs(values.date)
                  ? values.date
                  : dayjs(values.date);
               if (dateValue.isValid()) {
                  values.date = dateValue.format("DD MMM 'YY");
               } else {
                  values.date = null;
               }
            }

            if (values.assignee) {
               values.assignee = {
                  name: values.assignee,
                  initials: values.assignee
                     .split(" ")
                     .map((word: string) => word[0])
                     .join("")
                     .toUpperCase(),
               };
            }

            if (values.subtasks && Array.isArray(values.subtasks)) {
               values.subtasks = values.subtasks.map((subtask: ISubtask) => {
                  if (typeof subtask === "string") {
                     return {
                        id: `subtask_${Date.now()}_${Math.random()
                           .toString(36)
                           .substr(2, 9)}`,
                        text: subtask,
                        completed: false,
                     };
                  }
                  return subtask;
               });
            }

            console.log("Processed values:", values);

            mutateTask({
               id: task.id,
               task: {
                  ...values,
                  hasChildren:
                     (values.subtasks && values.subtasks.length > 0) || false,
               },
            });

            setIsModalOpen(false);
            form.resetFields();
         })
         .catch((info) => {
            console.log("Validation Failed:", info);
         });
   };

   return (
      <>
         <button
            onClick={showModal}
            className={`cursor-pointer hover:scale-110 transition-transform ${className}`}
            {...props}>
            {icon}
         </button>

         <Modal
            title="Edit Task"
            closable={{ "aria-label": "Close Edit Task Modal" }}
            open={isModalOpen}
            width="600px"
            onOk={handleSubmit}
            onCancel={handleCancel}
            okText="Save Changes"
            cancelText="Cancel"
            afterClose={handleCancel}>
            <EditTaskModal form={form} task={task} />
         </Modal>
      </>
   );
};

export default EditTaskModalButton;
