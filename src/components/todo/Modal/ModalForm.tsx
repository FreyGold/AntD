import { PlusOutlined } from "@ant-design/icons";
import {
   DatePicker,
   Form,
   Input,
   Radio,
   Select,
   Switch,
   Upload,
   type FormInstance,
} from "antd";

const { TextArea } = Input;

const normFile = (e: any) => {
   if (Array.isArray(e)) {
      return e;
   }
   return e?.fileList;
};

const id = String(Math.ceil(Math.random() * 100000));

const ModalForm = ({
   form,
   columnId,
}: {
   form: FormInstance;
   columnId?: string;
}) => {
   return (
      <Form
         form={form}
         labelCol={{ span: 4 }}
         wrapperCol={{ span: 14 }}
         layout="horizontal"
         style={{ maxWidth: 600 }}>
         <Form.Item name="id" initialValue={id} noStyle></Form.Item>
         {/* if the button is pressed from a certain table it will automatically contain it's id (type) */}
         {!columnId && (
            <Form.Item name="type" label="Category">
               <Radio.Group>
                  <Radio value="todo"> To-Do </Radio>
                  <Radio value="in-progress"> In-Progress </Radio>
                  <Radio value="done"> Done </Radio>
               </Radio.Group>
            </Form.Item>
         )}
         {columnId && (
            <Form.Item name="type" initialValue={columnId} noStyle></Form.Item>
         )}

         <Form.Item name="title" label="Task Title">
            <Input />
         </Form.Item>
         <Form.Item name="priority" label="Priority">
            <Select>
               <Select.Option value="low">Low</Select.Option>
               <Select.Option value="medium">Medium</Select.Option>
               <Select.Option value="high">High</Select.Option>
            </Select>
         </Form.Item>

         <Form.Item name="date" label="Start Date">
            <DatePicker />
         </Form.Item>
         <Form.Item name="due-date" label="Due Date">
            <DatePicker />
         </Form.Item>

         <Form.Item name="description" label="Description">
            <TextArea rows={4} />
         </Form.Item>
         <Form.Item name="hasLock" label="Locked" valuePropName="checked">
            <Switch />
         </Form.Item>
         <Form.Item
            name="attachments"
            label="Attachments    "
            valuePropName="fileList"
            getValueFromEvent={normFile}>
            <Upload
               action="/upload.do"
               listType="picture-card"
               style={{ marginLeft: "4px" }}>
               <button
                  style={{
                     color: "inherit",
                     cursor: "inherit",
                     border: 0,
                     background: "none",
                  }}
                  type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
               </button>
            </Upload>
         </Form.Item>
      </Form>
   );
};

export default ModalForm;
