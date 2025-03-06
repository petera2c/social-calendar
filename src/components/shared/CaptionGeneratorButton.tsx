import React, { useState } from "react";
import { Button } from "antd";
import { generateCaption } from "../../utils/captionGenerator";
import { Dayjs } from "dayjs";

interface CaptionGeneratorButtonProps {
  platform: "x" | "facebook" | "instagram" | "linkedin" | "pinterest";
  day: number;
  postDate: Dayjs | null;
  hasMedia?: boolean;
  onCaptionGenerated: (caption: string) => void;
}

const CaptionGeneratorButton: React.FC<CaptionGeneratorButtonProps> = ({
  platform,
  day,
  postDate,
  hasMedia = false,
  onCaptionGenerated,
}) => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const caption = await generateCaption({
      platform,
      day,
      date: postDate?.toISOString(),
      hasMedia,
    });
    onCaptionGenerated(caption);
    setLoading(false);
  };

  return (
    <Button onClick={handleGenerate} loading={loading}>
      Generate Caption
    </Button>
  );
};

export default CaptionGeneratorButton;
