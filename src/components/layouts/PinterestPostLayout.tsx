import React from "react";
import { Form, FormInstance, Input } from "antd";
import ScheduledDatePicker from "../shared/ScheduledDatePicker";
import FileUploader from "../shared/FileUploader";
import PostContainer from "../shared/PostContainer";
import { inputStyles, textAreaStyles } from "../../utils/formStyles";
import { Dayjs } from "dayjs";

interface PostLayoutProps {
  form: FormInstance;
  postDate: Dayjs;
  setPostDate: (date: Dayjs) => void;
}

const PinterestPostLayout: React.FC<PostLayoutProps> = ({
  form,
  postDate,
  setPostDate,
}) => {
  return (
    <PostContainer>
      <Form.Item
        name="photo"
        rules={[{ required: true, message: "Please upload a pin image" }]}
      >
        <FileUploader isDrag label="Create a Pin" />
      </Form.Item>
      <Form.Item name="title">
        <Input placeholder="Add a title" className={inputStyles} />
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea
          rows={2}
          placeholder="Tell everyone what your Pin is about"
          className={textAreaStyles}
        />
      </Form.Item>
      <Form.Item name="date">
        <ScheduledDatePicker value={postDate} onChange={setPostDate} />
      </Form.Item>
    </PostContainer>
  );
};

export default PinterestPostLayout;
