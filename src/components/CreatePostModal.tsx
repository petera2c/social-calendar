import React, { useState } from "react";
import { Modal, Form, Input, Button, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: number;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  day,
}) => {
  const [form] = Form.useForm();
  const [postDate, setPostDate] = useState<Dayjs | null>(null);

  const handleFinish = (values: any) => {
    console.log("Social Media Post Data:", {
      ...values,
      date: postDate ? postDate.format("YYYY-MM-DD") : null,
    });
    form.resetFields();
    setPostDate(null);
    onClose();
  };

  return (
    <Modal
      title={`Create Social Media Post for Day ${day}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ content: "" }}
      >
        <Form.Item
          label="Post Content"
          name="content"
          rules={[{ required: true, message: "Please enter post content" }]}
        >
          <Input.TextArea rows={4} placeholder="Write your post here..." />
        </Form.Item>
        <Form.Item label="Schedule Date" name="date">
          <DatePicker
            value={postDate}
            onChange={(date) => setPostDate(date)}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
            className="w-full"
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Create Post
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
