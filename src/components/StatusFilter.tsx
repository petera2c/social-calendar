import React from "react";
import { Select } from "antd";
import { PostStatus } from "../types/post";

const { Option } = Select;

interface StatusFilterProps {
  selectedStatus: PostStatus | "all";
  onStatusChange: (status: PostStatus | "all") => void;
}

const statusOptions: { value: PostStatus | "all"; label: string }[] = [
  { value: "all", label: "All Posts" },
  { value: "draft", label: "Drafts" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
];

const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onStatusChange,
}) => {
  return (
    <Select
      value={selectedStatus}
      onChange={onStatusChange}
      className="w-32"
      popupMatchSelectWidth={false}
    >
      {statusOptions.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default StatusFilter;
