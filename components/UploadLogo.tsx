"use client";

import { axiosClient } from "@/lib/axios";
import { params } from "@/lib/constants";
import { useState } from "react";
import Image from "next/image";
import { UploadedLogoResponse } from "@/types/api";

type Props = {
  paymentIntentId: string;
};

const UploadLogo = ({ paymentIntentId }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
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

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={onChange} />

      <button
        disabled={!files.length || uploading}
        onClick={onUpload}
        className="bg-purple-600 px-4 py-2 rounded-xl text-white disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

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
