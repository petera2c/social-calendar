import React, { useState } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";

const { Dragger } = Upload;

interface FileUploaderProps {
  multiple?: boolean;
  maxCount?: number;
  isDrag?: boolean; // Use Dragger for photo-focused platforms
  label: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  multiple = false,
  maxCount = 1,
  isDrag = false,
  label,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadProps = {
    multiple,
    maxCount,
    onChange: ({ fileList }: { fileList: UploadFile[] }) =>
      setFileList(fileList.slice(-maxCount)),
    fileList,
  };

  return isDrag ? (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <UploadOutlined />
      </p>
      <p className="ant-upload-text text-lg font-semibold">{label}</p>
      <p className="ant-upload-hint">
        Click or drag {multiple ? "photos" : "a photo"} to upload
      </p>
    </Dragger>
  ) : (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>{label}</Button>
    </Upload>
  );
};

export default FileUploader;
