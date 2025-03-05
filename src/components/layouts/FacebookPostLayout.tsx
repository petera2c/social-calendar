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

const FacebookPostLayout: React.FC<PostLayoutProps> = ({
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
          rows={3}
          placeholder="What's on your mind?"
          className={`${textAreaStyles} border-none`}
        />
      </Form.Item>
      <Form.Item name="photos">
        <FileUploader multiple maxCount={10} isDrag label="Add Photos" />
      </Form.Item>
      <Form.Item name="date">
        <ScheduledDatePicker value={postDate} onChange={setPostDate} />
      </Form.Item>
    </PostContainer>
  );
};

export default FacebookPostLayout;
