"use client";

import { endpoint } from "@/lib/constants";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useState } from "react";
import { cloudinaryPreset } from "@/lib/constants";

type UploadWidgetProps = {
  btnText?: string;
  preset: (typeof cloudinaryPreset)[keyof typeof cloudinaryPreset];
};

const UploadWidget = ({ btnText = "Upload", preset }: UploadWidgetProps) => {
  const [resource, setResource] = useState<
    CloudinaryUploadWidgetInfo | string
  >();

  console.log("resource");
  console.log(resource);

  return (
    <CldUploadWidget
      signatureEndpoint={endpoint.cloudinarySigning}
      uploadPreset={preset}
      options={{ sources: ["local"], clientAllowedFormats: ["image"] }}
      onSuccess={(result, { widget }) => {
        console.log(result);
        setResource(result?.info);
      }}
      onQueuesEnd={(result, { widget }) => {
        // widget.close();
      }}
    >
      {({ open }) => {
        const handleOnClick = () => {
          setResource(undefined);
          open();
        };

        return (
          <div>
            <button
              className="bg-purple-600 p-2 rounded-2xl hover:bg-purple-800 cursor-pointer"
              onClick={handleOnClick}
            >
              {btnText}
            </button>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadWidget;
