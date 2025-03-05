import React from "react";
import { Form, FormInstance, Input } from "antd";
import ScheduledDatePicker from "../shared/ScheduledDatePicker";
import FileUploader from "../shared/FileUploader";
import PostContainer from "../shared/PostContainer";
import { textAreaStyles } from "../../utils/formStyles";
import { Dayjs } from "dayjs";

interface PostLayoutProps {
  form: FormInstance;
  postDate: Dayjs;
  setPostDate: (date: Dayjs) => void;
}

const LinkedInPostLayout: React.FC<PostLayoutProps> = ({
  form,
  postDate,
  setPostDate,
}) => {
  return (
    <PostContainer>
      <Form.Item
        name="content"
        rules={[{ required: true, message: "Please enter your post content" }]}
      >
        <Input.TextArea
          rows={4}
          placeholder="What do you want to talk about?"
          className={textAreaStyles}
        />
      </Form.Item>
      <Form.Item name="file">
        <FileUploader label="Upload a File" />
      </Form.Item>
      <Form.Item name="date">
        <ScheduledDatePicker value={postDate} onChange={setPostDate} />
      </Form.Item>
    </PostContainer>
  );
};

export default LinkedInPostLayout;
