import React from "react";
import { Form, FormInstance, Input } from "antd";
import ScheduledDatePicker from "../shared/ScheduledDatePicker";
import PostContainer from "../shared/PostContainer";
import { textAreaStyles } from "../../utils/formStyles";
import { Dayjs } from "dayjs";

interface PostLayoutProps {
  form: FormInstance;
  postDate: Dayjs;
  setPostDate: (date: Dayjs) => void;
}

const XPostLayout: React.FC<PostLayoutProps> = ({
  form,
  postDate,
  setPostDate,
}) => {
  return (
    <PostContainer className="bg-gray-100">
      <Form.Item
        name="content"
        rules={[{ required: true, message: "Please enter your post content" }]}
      >
        <Input.TextArea
          rows={3}
          placeholder="What's happening?"
          maxLength={280}
          showCount
          className={textAreaStyles}
        />
      </Form.Item>
      <Form.Item name="date">
        <ScheduledDatePicker value={postDate} onChange={setPostDate} />
      </Form.Item>
    </PostContainer>
  );
};

export default XPostLayout;
