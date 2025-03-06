import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Button } from "antd";
import dayjs, { Dayjs } from "dayjs";
import XPostLayout from "./layouts/XPostLayout";
import FacebookPostLayout from "./layouts/FacebookPostLayout";
import InstagramPostLayout from "./layouts/InstagramPostLayout";
import LinkedInPostLayout from "./layouts/LinkedInPostLayout";
import PinterestPostLayout from "./layouts/PinterestPostLayout";
import { Post } from "../types/post";
import { useSocialPosts } from "../contexts/SocialPostsContext";
import CaptionGeneratorButton from "./shared/CaptionGeneratorButton";

const { Option } = Select;

const convertDate = (date: Dayjs | string) => {
  if (dayjs.isDayjs(date)) return date;
  return dayjs(date);
};

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
];

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: Dayjs;
  isOutOfMonth: boolean;
  post: Post | null;
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
  post,
}) => {
  const [form] = Form.useForm();
  const [postDate, setPostDate] = useState<Dayjs>(day);
  const { posts, setPosts } = useSocialPosts();

  const socialMedia = Form.useWatch("socialMedia", form);

  const handleFinish = (values: Post) => {
    if (post) {
      const updatedPost = {
        ...post,
        ...values,
        timestamp: postDate.format("YYYY-MM-DD HH:mm:ss"),
      };
      const updatedPosts = posts.map((p) =>
        p.id === post.id ? updatedPost : p
      );
      setPosts(updatedPosts);
    } else {
      const newPost: Post = {
        ...values,
        timestamp: postDate.format("YYYY-MM-DD HH:mm:ss"),
        id: `${posts.length + 1}`,
        author: {
          id: "1",
          name: "John Doe",
          avatar: "https://via.placeholder.com/150",
        },
      };
      const newPosts = [...posts, newPost];
      setPosts(newPosts);
    }

    form.resetFields();
    onClose();
  };
  const handleCaptionGenerated = (caption: string) => {
    form.setFieldsValue({
      content: caption,
    });
  };

  const renderLayout = () => {
    switch (socialMedia) {
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

  useEffect(() => {
    if (post) {
      form.setFieldsValue({
        date: convertDate(post.timestamp),
        socialMedia: post.socialMedia,
        content: post.content,
        photos: post.media?.map((m) => m.url),
        status: post.status,
      });
    } else if (day) {
      form.setFieldsValue({
        date: day,
        socialMedia: "x",
        status: "draft",
      });
    }
  }, [day, form, post]);

  return (
    <Modal
      title={`Posting to ${socialMedia}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      forceRender
      centered
      width={600}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={
          post
            ? {
                date: convertDate(post?.timestamp),
                socialMedia: post?.socialMedia,
                content: post?.content,
                photos: post?.media?.map((m) => m.url),
                status: post?.status,
              }
            : {
                date: day,
                socialMedia: "x",
                status: "draft",
              }
        }
      >
        <Form.Item label="Platform" className="mb-4" name="socialMedia">
          <Select className="w-full">
            {platformOptions.map((opt, index) => (
              <Option key={index} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Status" className="mb-4" name="status">
          <Select className="w-full">
            {statusOptions.map((opt, index) => (
              <Option key={index} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {renderLayout()}
        <Form.Item className="mt-4">
          <div className="flex items-center justify-end space-x-2">
            <CaptionGeneratorButton
              platform={socialMedia}
              day={day.date()}
              postDate={postDate}
              hasMedia={post?.media?.length ? post?.media?.length > 0 : false}
              onCaptionGenerated={handleCaptionGenerated}
            />
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
