"use client";

import { axiosClient } from "@/lib/axios";
import { acceptedFiles, MAX_FILE_SIZE_MB, params } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { UploadedLogoResponse } from "@/types/api";
import { X } from "lucide-react";

type Props = {
  paymentIntentId: string;
};

type Preview =
  | { kind: "image"; file: File; url: string }
  | { kind: "file"; file: File };

const UploadLogo = ({ paymentIntentId }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  console.log(files);

  const previews: Preview[] = files.map((file) =>
    file.type.startsWith("image/")
      ? { kind: "image", file, url: URL.createObjectURL(file) }
      : { kind: "file", file },
  );

  /* ---- Cleanup previews ---- */
  useEffect(() => {
    return () => {
      previews.forEach((p) => {
        if (p.kind === "image") URL.revokeObjectURL(p.url);
      });
    };
  }, [previews]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.currentTarget.files;
    if (!selectedFiles) return;

    const safeFiles = Array.from(selectedFiles);

    setFiles(safeFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setFiles(fileArray);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const onUpload = async () => {
    if (!files.length) return;

    setUploading(true);

    const formData = new FormData();
    formData.append(params.PAYMENT_INTENT_ID, paymentIntentId);
    files.forEach((file) => formData.append("file", file));

    const res = await axiosClient.post<UploadedLogoResponse>(
      "/user-logo-upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("res in UploadLogo: ", res);

    setUploaded(res.data.files.map((f) => f.secure_url));
    setUploading(false);
    setFiles([]);
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));

    // Reset the input so browser label updates
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-[275px] my-2 rounded-md border-2 border-dotted text-emerald-500 border-emerald-500 hover:border-emerald-200 hover:text-emerald-200 ${isDragging && "border-emerald-200"}  transition duration-300 cursor-pointer flex  justify-center items-center`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptedFiles}
          multiple
          onChange={onChange}
          className="hidden"
        />
        <div className="text-center">
          <p>Upload your logo files here</p>
          <p className="text-xs">
            Max file size: {MAX_FILE_SIZE_MB}MB / {acceptedFiles}
          </p>
        </div>
      </label>

      <button
        disabled={!files.length || uploading}
        onClick={onUpload}
        className="w-full bg-purple-600 hover:bg-purple-600/80 transition duration-500 cursor-pointer px-4 py-2 rounded-xl text-white disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* --- Preview before upload --- */}
      <div className="mt-2 h-26 ">
        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {previews.map((p, i) => (
              <div key={p.file.name} className="relative rounded h-26 bg-white">
                <span
                  onClick={() => removeImage(i)}
                  className="bg-red-500 hover:bg-red-600 transition duration-500 rounded-full p-1 flex justify-center items-center size-5 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer group "
                >
                  <X className="group-hover:scale-125 transition duration-500" />
                </span>
                {p.kind === "image" ? (
                  <Image
                    src={p.url}
                    alt={p.file.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-700">{p.file.name}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {uploaded.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {uploaded.map((url) => (
            <div key={url} className="relative w-32 h-32">
              <Image
                alt={url}
                src={url}
                fill
                className="object-contain border rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadLogo;
