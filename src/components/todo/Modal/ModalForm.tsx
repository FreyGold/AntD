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
// import MdEditor from "./MdEditor/MdEditor";

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
      // <div className="w-[60vw]">
      <div>
         <Form
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 50 }}
            // style={{ maxWidth: 600 }} // ASK
            layout="horizontal"
            validateMessages={{
               required: "'${label}' is required!",
            }}>
            <Form.Item name="id" initialValue={id} noStyle></Form.Item>
            <Form.Item
               name="completed"
               initialValue={false}
               noStyle></Form.Item>
            {/* if the button is pressed from a certain table it will automatically contain it's id (type) */}
            {!columnId && (
               <Form.Item
                  name="type"
                  label="Category"
                  rules={[{ required: true }]}
                  hasFeedback>
                  {/* FIXME */}
                  <Radio.Group>
                     <Radio value="1"> To-Do </Radio>
                     <Radio value="2"> In-Progress </Radio>
                     <Radio value="3"> Done </Radio>
                  </Radio.Group>
               </Form.Item>
            )}
            {columnId && (
               <Form.Item
                  name="type"
                  initialValue={columnId}
                  noStyle></Form.Item>
            )}

            <Form.Item
               name="title"
               label="Task Title"
               rules={[{ required: true }]}
               hasFeedback>
               <Input />
            </Form.Item>
            <Form.Item
               name="priority"
               label="Priority"
               rules={[{ required: true }]}
               hasFeedback>
               <Select allowClear>
                  <Select.Option value="low">Low</Select.Option>
                  <Select.Option value="medium">Medium</Select.Option>
                  <Select.Option value="high">High</Select.Option>
               </Select>
            </Form.Item>

            <Form.Item
               name="date"
               label="Start Date"
               rules={[{ required: true }]}
               hasFeedback>
               <DatePicker />
            </Form.Item>
            <Form.Item name="due-date" label="Due Date">
               <DatePicker />
            </Form.Item>

            <Form.Item
               name="description"
               label="Description"
               rules={[{ required: true }]}
               hasFeedback>
               <TextArea />
            </Form.Item>
            <Form.Item
               name={["assignee", "name"]} // ← nested path // TALK
               label="Assignee"
               rules={[{ required: true }]}
               hasFeedback>
               <Input />
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
      </div>
   );
};

export default ModalForm;
