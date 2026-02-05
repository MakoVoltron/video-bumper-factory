"use client";

import { axiosClient } from "@/lib/axios";
import { params } from "@/lib/constants";
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
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".png, .jpg, .jpeg,.zip,.ai,.psd"
        multiple
        onChange={onChange}
      />

      <button
        disabled={!files.length || uploading}
        onClick={onUpload}
        className="bg-purple-600 px-4 py-2 rounded-xl text-white disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* --- Preview before upload --- */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {previews.map((p, i) => (
            <div
              key={p.file.name}
              className="relative  rounded p-2 h-26 bg-amber-100"
            >
              <span
                onClick={() => removeImage(i)}
                className="bg-red-500 rounded-full p-1 flex justify-center items-center size-5 absolute -top-1 -right-1 z-40 cursor-pointer"
              >
                <X />
              </span>
              {p.kind === "image" ? (
                <Image
                  src={p.url}
                  alt={p.file.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <span className="text-sm text-gray-700">{p.file.name}</span>
              )}
            </div>
          ))}
        </div>
      )}

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
