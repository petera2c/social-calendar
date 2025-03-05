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

const InstagramPostLayout: React.FC<PostLayoutProps> = ({
  form,
  postDate,
  setPostDate,
}) => {
  return (
    <PostContainer>
      <Form.Item
        name="photo"
        rules={[{ required: true, message: "Please upload a photo" }]}
      >
        <FileUploader isDrag label="Add a Photo" />
      </Form.Item>
      <Form.Item name="caption">
        <Input.TextArea
          rows={2}
          placeholder="Write a caption..."
          className={textAreaStyles}
        />
      </Form.Item>
      <Form.Item name="date">
        <ScheduledDatePicker value={postDate} onChange={setPostDate} />
      </Form.Item>
    </PostContainer>
  );
};

export default InstagramPostLayout;
