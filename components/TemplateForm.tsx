"use client";

import { CategoryLabels } from "@/app/(admin)/dashboard/add-template-form";
import { CATEGORY_TYPE } from "@/lib/constants";
import { ChangeEvent, useState } from "react";
import BlockingOverlay from "./ui/BlockingOverlay";
import Input from "./ui/Input";
import Label from "./ui/Label";
import Button from "./ui/Button";
import Image from "next/image";
import Video from "./ui/Video";
import { VideoMode } from "@/types/video";

type UploadStatus = "idle" | "uploading" | "success" | "error";

type TemplateFormProps = {
  initialValues?: {
    title: string;
    category: CategoryLabels;
    posterUrl?: string;
    videoUrl?: string;
  };
  mode?: VideoMode;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (args: {
    title: string;
    category: CategoryLabels;
    posterFile?: File | null;
    videoFile?: File | null;
    onProgress?: (p: number) => void;
  }) => Promise<void>;
};

const TemplateForm = ({
  submitLabel,
  initialValues,
  //   isSubmitting,
  mode = "hover",
  onSubmit,
}: TemplateFormProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [category, setCategory] = useState<CategoryLabels>(
    initialValues?.category ?? CATEGORY_TYPE[0].label,
  );

  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [posterPreview, setPosterPreview] = useState<string | null>(
    initialValues?.posterUrl ?? null,
  );
  const [videoPreview, setVideoPreview] = useState<string | null>(
    initialValues?.videoUrl ?? null,
  );

  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      setPosterFile(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("uploading");

    try {
      await onSubmit({
        title,
        category,
        posterFile,
        videoFile,
        onProgress: setProgress,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setProgress(0);
    }
  };

  return (
    <>
      <BlockingOverlay visible={status === "uploading"} />

      <div className="grid grid-cols-12 gap-4">
        <form onSubmit={handleSubmit} className="col-span-12 lg:col-span-6">
          <div className="grid grid-cols-12 gap-2 mb-2">
            <Input
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Template name"
              cols="12"
              value={title}
            />
            <Input
              onChange={handleChange}
              name="poster"
              placeholder="Poster"
              type="file"
              cols="6"
              validated={!!posterPreview}
              accept="image/png"
            />
            <Input
              onChange={handleChange}
              name="video"
              placeholder="Video Preview"
              type="file"
              cols="6"
              validated={!!videoPreview}
              accept="video/mp4"
            />
          </div>

          <Label text="Logo orientation" />
          <div className="grid grid-cols-12 gap-2 mb-2">
            {CATEGORY_TYPE.map((item) => {
              const Icon = item.icon;
              return (
                <label
                  key={item.label}
                  htmlFor={item.label}
                  className={`border-purple-700 ${
                    item.label === category
                      ? "bg-purple-700"
                      : "bg-purple-950 border-2 hover:bg-purple-900"
                  }  transition duration-300 col-span-4 flex justify-center items-center h-18 rounded cursor-pointer`}
                >
                  {Icon && <Icon />}
                  <input
                    id={item.label}
                    checked={item.label === category}
                    name="category"
                    className="hidden"
                    type="radio"
                    value={item.label}
                    onChange={() => setCategory(item.label)}
                  />
                </label>
              );
            })}
          </div>

          <Button
            text={submitLabel}
            size="sm"
            // onClick={handleSubmit}
            type="submit"
            disabled={status === "uploading"}
          />
        </form>

        <div className="col-span-12 lg:col-span-6">
          <div
            className="mb-2"
            style={{ aspectRatio: "16/9", overflow: "hidden" }}
          >
            {!posterPreview && !videoPreview && (
              <button
                type="button"
                className="w-full h-full flex justify-center items-center border-2 border-dotted  border-gray-400 rounded-2xl hover:border-emerald-500 cursor-pointer"
              >
                Preview placeholder
              </button>
            )}

            {posterPreview && !videoPreview && (
              <Image
                alt={posterFile?.name || "preview poster"}
                src={posterPreview}
                width={1280}
                height={720}
                className="object-cover w-full h-full"
              />
            )}

            {videoPreview && posterPreview && (
              <Video
                posterUrl={posterPreview}
                videoUrl={videoPreview}
                mode={mode}
              />
            )}
          </div>
          <div
            style={{ width: `${progress}%` }}
            className="bg-purple-700 h-1 rounded"
          ></div>
        </div>
      </div>
    </>
  );
};

export default TemplateForm;
