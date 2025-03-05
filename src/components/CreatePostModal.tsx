import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Button } from "antd";
import dayjs, { Dayjs } from "dayjs";
import XPostLayout from "./layouts/XPostLayout";
import FacebookPostLayout from "./layouts/FacebookPostLayout";
import InstagramPostLayout from "./layouts/InstagramPostLayout";
import LinkedInPostLayout from "./layouts/LinkedInPostLayout";
import PinterestPostLayout from "./layouts/PinterestPostLayout";

const { Option } = Select;

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: Dayjs;
  isOutOfMonth: boolean;
}

const platformOptions = [
  { value: "x", label: "X" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "pinterest", label: "Pinterest" },
];

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  day,
  isOutOfMonth,
}) => {
  const [form] = Form.useForm();
  const [postDate, setPostDate] = useState<Dayjs>(day);
  const [platform, setPlatform] = useState<string>("x");

  const handleFinish = (values: any) => {
    console.log(`${platform.toUpperCase()} Post Data:`, {
      ...values,
      date: postDate ? postDate.format("YYYY-MM-DD") : null,
    });
    form.resetFields();
    setPostDate(day);
    onClose();
  };

  const renderLayout = () => {
    switch (platform) {
      case "x":
        return (
          <XPostLayout
            form={form}
            postDate={postDate}
            setPostDate={setPostDate}
          />
        );
      case "facebook":
        return (
          <FacebookPostLayout
            form={form}
            postDate={postDate}
            setPostDate={setPostDate}
          />
        );
      case "instagram":
        return (
          <InstagramPostLayout
            form={form}
            postDate={postDate}
            setPostDate={setPostDate}
          />
        );
      case "linkedin":
        return (
          <LinkedInPostLayout
            form={form}
            postDate={postDate}
            setPostDate={setPostDate}
          />
        );
      case "pinterest":
        return (
          <PinterestPostLayout
            form={form}
            postDate={postDate}
            setPostDate={setPostDate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={`Schedule a Post for Day ${day} on ${
        platform.charAt(0).toUpperCase() + platform.slice(1)
      }`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={{
          date: day,
        }}
      >
        <Form.Item label="Platform" className="mb-4">
          <Select
            value={platform}
            onChange={(value) => setPlatform(value)}
            className="w-full"
          >
            {platformOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {renderLayout()}
        <Form.Item className="mt-4">
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Schedule Post
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
