"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Video from "@/components/ui/Video";
import { toast } from "react-toastify";
import Label from "@/components/ui/Label";
import { useUploadTemplate } from "@/hooks/useUploadTemplate";

import { redirect } from "next/navigation";
import BlockingOverlay from "@/components/ui/BlockingOverlay";
import { CATEGORY_TYPE } from "@/lib/constants";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export type CategoryLabels = (typeof CATEGORY_TYPE)[number]["label"];

const AddTemplateForm = () => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [templatePreview, setTemplatePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [category, setCategory] = useState<CategoryLabels>(
    CATEGORY_TYPE[0].label,
  );
  const [progress, setProgress] = useState(0);

  const { mutate: uploadTemplate, isPending } = useUploadTemplate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("video/")) {
      setVideo(file);
      setTemplatePreview(URL.createObjectURL(file));
    } else {
      setPoster(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!poster || !video) return;

    setStatus("uploading");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("poster", poster);
    formData.append("video", video);
    formData.append("category", category);

    uploadTemplate(
      { formData, onProgress: setProgress },
      {
        onSuccess: () => {
          setProgress(0);
          toast.success("Template added to selection");
          redirect("/");
        },
        onError: (error) => {
          setProgress(0);
          toast.error(
            error instanceof Error
              ? error.message
              : "Template could not be added",
          );
        },
      },
    );
  };

  return (
    <>
      <BlockingOverlay visible={isPending} />

      <div className="grid grid-cols-12 gap-4">
        <form className="col-span-12 lg:col-span-6">
          <div className="grid grid-cols-12 gap-2 mb-2">
            <Input
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Template name"
              cols="12"
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
              validated={!!templatePreview}
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
                      : " border-2 hover:bg-purple-900"
                  }  transition duration-300 col-span-4 flex justify-center items-center h-18 rounded cursor-pointer`}
                >
                  {Icon && <Icon />}
                  {/* {item.label} */}
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
            onClick={handleSubmit}
            text="Upload"
            size="sm"
            disabled={!poster || !video || status === "uploading"}
          />
        </form>

        <div className="col-span-12 lg:col-span-6">
          <div
            className="mb-2"
            style={{ aspectRatio: "16/9", overflow: "hidden" }}
          >
            {!posterPreview && !templatePreview && (
              <button className="w-full h-full flex justify-center items-center border-2 border-dotted  border-gray-400 rounded-2xl hover:border-emerald-500 cursor-pointer">
                Preview placeholder
              </button>
            )}

            {posterPreview && !templatePreview && (
              <Image
                alt={poster?.name || "preview poster"}
                src={posterPreview}
                width={1280}
                height={720}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            )}

            {templatePreview && posterPreview && (
              <Video posterUrl={posterPreview} videoUrl={templatePreview} />
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

export default AddTemplateForm;
