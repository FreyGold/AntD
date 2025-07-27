import React, { useEffect, useState } from "react";
import {
   Form,
   Input,
   DatePicker,
   Switch,
   Tag,
   Upload,
   Space,
   Button,
   Divider,
   Popover,
   List,
   Checkbox,
} from "antd";
import {
   PaperClipOutlined,
   CalendarOutlined,
   LockOutlined,
   UserOutlined,
   PlusOutlined,
   BgColorsOutlined,
   MinusCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import type { ITask, ISubtask } from "@/services/types/ITask";
import type { FormInstance } from "antd/es/form";

const { TextArea } = Input;

interface EditTaskModalProps {
   form: FormInstance<ITask>;
   task: ITask;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ form, task }) => {
   const [tags, setTags] = useState<string[]>(task?.tags || []);
   const [tagColors, setTagColors] = useState<Record<string, string>>(
      task?.tagColors || {}
   );
   const [subtasks, setSubtasks] = useState<ISubtask[]>(task?.subtasks || []);
   const [newTag, setNewTag] = useState("");
   const [newSubtask, setNewSubtask] = useState("");
   const [showSubtaskInput, setShowSubtaskInput] = useState(false);

   const availableColors = [
      {
         name: "red",
         class: "bg-red-100 text-red-700 border-red-200",
         bgColor: "#fee2e2",
         textColor: "#dc2626",
         borderColor: "#fecaca",
      },
      {
         name: "green",
         class: "bg-green-100 text-green-700 border-green-200",
         bgColor: "#dcfce7",
         textColor: "#16a34a",
         borderColor: "#bbf7d0",
      },
      {
         name: "blue",
         class: "bg-blue-100 text-blue-700 border-blue-200",
         bgColor: "#dbeafe",
         textColor: "#2563eb",
         borderColor: "#bfdbfe",
      },
      {
         name: "orange",
         class: "bg-orange-100 text-orange-700 border-orange-200",
         bgColor: "#fed7aa",
         textColor: "#ea580c",
         borderColor: "#fdba74",
      },
      {
         name: "purple",
         class: "bg-purple-100 text-purple-700 border-purple-200",
         bgColor: "#e9d5ff",
         textColor: "#9333ea",
         borderColor: "#d8b4fe",
      },
   ];

   // Generate unique ID for subtasks
   const generateSubtaskId = () => {
      return `subtask_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
   };

   // Initialize form with task data when task changes
   useEffect(() => {
      if (task) {
         let dateValue = null;
         if (task.date) {
            try {
               const parsedDate = dayjs(task.date, "DD MMM 'YY");
               if (parsedDate.isValid()) {
                  dateValue = parsedDate;
               }
            } catch (error) {
               console.warn("Error parsing task date:", task.date, error);
            }
         }

         form.setFieldsValue({
            title: task.title,
            description: task.description,
            completed: task.completed,
            type: task.type,
            date: dateValue,
            hasLock: task.hasLock,
            hasCalendar: task.hasCalendar,
            assignee: task.assignee?.name || "",
         } as any);
         setTags(task.tags || []);
         setTagColors(task.tagColors || {});

         const processedSubtasks = (task.subtasks || []).map((subtask) => {
            if (typeof subtask === "string") {
               return {
                  id: generateSubtaskId(),
                  text: subtask,
                  completed: false,
               };
            }
            return subtask;
         });
         setSubtasks(processedSubtasks);
      }
   }, [task, form]);

   const handleAddTag = () => {
      if (newTag && !tags.includes(newTag)) {
         const newTags = [...tags, newTag];
         const newTagColors = {
            ...tagColors,
            [newTag]: "bg-blue-100 text-blue-700 border-blue-200",
         };
         setTags(newTags);
         setTagColors(newTagColors);
         form.setFieldValue("tags", newTags);
         form.setFieldValue("tagColors", newTagColors);
         setNewTag("");
      }
   };

   const handleRemoveTag = (tagToRemove: string) => {
      const newTags = tags.filter((tag: string) => tag !== tagToRemove);
      const newTagColors = { ...tagColors };
      delete newTagColors[tagToRemove];

      setTags(newTags);
      setTagColors(newTagColors);
      form.setFieldValue("tags", newTags);
      form.setFieldValue("tagColors", newTagColors);
   };

   const handleColorChange = (tag: string, colorClass: string) => {
      const newTagColors = { ...tagColors, [tag]: colorClass };
      setTagColors(newTagColors);
      form.setFieldValue("tagColors", newTagColors);
   };

   const getTagStyle = (tag: string) => {
      const colorClass =
         tagColors[tag] || "bg-blue-100 text-blue-700 border-blue-200";
      const colorConfig = availableColors.find((c) => c.class === colorClass);
      if (colorConfig) {
         return {
            backgroundColor: colorConfig.bgColor,
            color: colorConfig.textColor,
            border: `1px solid ${colorConfig.borderColor}`,
         };
      }
      return {
         backgroundColor: "#dbeafe",
         color: "#2563eb",
         border: "1px solid #bfdbfe",
      };
   };

   const handleAddSubtask = () => {
      if (newSubtask.trim()) {
         const newSubtaskItem: ISubtask = {
            id: generateSubtaskId(),
            text: newSubtask.trim(),
            completed: false,
         };
         const newSubtasks = [...subtasks, newSubtaskItem];
         setSubtasks(newSubtasks);
         form.setFieldValue("subtasks", newSubtasks);
         setNewSubtask("");
         setShowSubtaskInput(false);
      }
   };

   const handleRemoveSubtask = (subtaskId: string) => {
      const newSubtasks = subtasks.filter(
         (subtask) => subtask.id !== subtaskId
      );
      setSubtasks(newSubtasks);
      form.setFieldValue("subtasks", newSubtasks);
   };

   const handleSubtaskToggle = (subtaskId: string) => {
      const newSubtasks = subtasks.map((subtask) =>
         subtask.id === subtaskId
            ? { ...subtask, completed: !subtask.completed }
            : subtask
      );
      setSubtasks(newSubtasks);
      form.setFieldValue("subtasks", newSubtasks);
   };

   const ColorPicker = ({ tag }: { tag: string }) => (
      <div className="flex gap-2 p-2">
         {availableColors.map((color) => (
            <div
               key={color.name}
               className="w-6 h-6 rounded cursor-pointer border-2 hover:scale-110 transition-transform"
               style={{
                  backgroundColor: color.bgColor,
                  borderColor:
                     tagColors[tag] === color.class
                        ? color.textColor
                        : "transparent",
               }}
               onClick={() => handleColorChange(tag, color.class)}
            />
         ))}
      </div>
   );

   const completedSubtasksCount = subtasks.filter(
      (subtask) => subtask.completed
   ).length;
   const totalSubtasksCount = subtasks.length;

   return (
      <Form form={form} layout="vertical" style={{ paddingTop: 16 }}>
         {/* Hidden fields */}
         <Form.Item name="tags" hidden>
            <Input />
         </Form.Item>
         <Form.Item name="tagColors" hidden>
            <Input />
         </Form.Item>
         <Form.Item name="subtasks" hidden>
            <Input />
         </Form.Item>

         {/* Task Title */}
         <Form.Item
            name="title"
            label="Task Title"
            rules={[{ required: true, message: "Please enter task title" }]}>
            <Input placeholder="Enter task title" size="large" />
         </Form.Item>

         {/* Description */}
         <Form.Item name="description" label="Description">
            <TextArea
               rows={3}
               placeholder="Add task description..."
               style={{ resize: "none" }}
            />
         </Form.Item>

         {/* Tags Section with Color Picker */}
         <Form.Item label="Tags">
            <div style={{ marginBottom: 8 }}>
               {tags.map((tag) => (
                  <Popover
                     key={tag}
                     content={<ColorPicker tag={tag} />}
                     title="Choose tag color"
                     trigger="click"
                     placement="bottom">
                     <Tag
                        closable
                        onClose={(e) => {
                           e.preventDefault();
                           handleRemoveTag(tag);
                        }}
                        style={{
                           marginBottom: 4,
                           cursor: "pointer",
                           ...getTagStyle(tag),
                        }}
                        icon={<BgColorsOutlined />}>
                        {tag}
                     </Tag>
                  </Popover>
               ))}
            </div>
            <Space.Compact style={{ width: "100%" }}>
               <Input
                  placeholder="Add new tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onPressEnter={handleAddTag}
                  style={{ width: "calc(100% - 80px)" }}
               />
               <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddTag}>
                  Add
               </Button>
            </Space.Compact>
         </Form.Item>

         <Divider style={{ margin: "16px 0" }} />

         <Space
            size="large"
            style={{
               width: "100%",
               display: "flex",
            }}>
            <Form.Item name="hasLock" label="Private" valuePropName="checked">
               <Switch />
            </Form.Item>
            <Form.Item
               name="completed"
               label="Completed"
               valuePropName="checked">
               <Switch />
            </Form.Item>
            <Form.Item
               name="hasCalendar"
               label="Add to Calendar"
               valuePropName="checked">
               <Switch />
            </Form.Item>
         </Space>

         <Space size="large" style={{ width: "100%" }}>
            <Form.Item
               name="assignee"
               label="Assignee"
               style={{ minWidth: 200 }}>
               <Input
                  placeholder="Enter assignee name"
                  prefix={<UserOutlined />}
               />
            </Form.Item>

            <Form.Item name="date" label="Due Date">
               <DatePicker
                  placeholder="Select date"
                  suffixIcon={<CalendarOutlined />}
                  format="DD MMM 'YY"
               />
            </Form.Item>
         </Space>

         <Form.Item
            label={
               <div>
                  <span>Subtasks</span>
                  {totalSubtasksCount > 0 && (
                     <span className="ml-4 text-xs text-text/80">
                        {completedSubtasksCount}/{totalSubtasksCount} completed
                     </span>
                  )}
               </div>
            }>
            {subtasks.length > 0 && (
               <List
                  bordered
                  dataSource={subtasks}
                  renderItem={(subtask) => (
                     <List.Item>
                        <Checkbox
                           checked={subtask.completed}
                           onChange={() => handleSubtaskToggle(subtask.id)}>
                           <span>{subtask.text}</span>
                        </Checkbox>
                        <Button
                           type="text"
                           size="small"
                           icon={<MinusCircleOutlined />}
                           onClick={() => handleRemoveSubtask(subtask.id)}
                           style={{ color: "#ff4d4f" }}
                        />
                     </List.Item>
                  )}
               />
            )}
            {showSubtaskInput ? (
               <Space.Compact style={{ width: "100%", marginTop: "8px" }}>
                  <Input
                     placeholder="Enter subtask"
                     value={newSubtask}
                     onChange={(e) => setNewSubtask(e.target.value)}
                     onPressEnter={handleAddSubtask}
                     style={{ width: "calc(100% - 160px)" }}
                     autoFocus
                  />
                  <Button type="primary" onClick={handleAddSubtask}>
                     Add
                  </Button>
                  <Button
                     onClick={() => {
                        setShowSubtaskInput(false);
                        setNewSubtask("");
                     }}>
                     Cancel
                  </Button>
               </Space.Compact>
            ) : (
               <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => setShowSubtaskInput(true)}
                  style={{ width: "100%", marginTop: "8px" }}>
                  Add Subtask
               </Button>
            )}
         </Form.Item>
      </Form>
   );
};

export default EditTaskModal;
