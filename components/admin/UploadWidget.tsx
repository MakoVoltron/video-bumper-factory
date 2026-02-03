"use client";

import { endpoint, params } from "@/lib/constants";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useState } from "react";
import { cloudinaryPreset } from "@/lib/constants";

type UploadWidgetProps = {
  btnText?: string;
  preset?: (typeof cloudinaryPreset)[keyof typeof cloudinaryPreset];
  paymentIntentId: string;
};

const UploadWidget = ({
  btnText = "Upload",
  preset,
  paymentIntentId,
}: UploadWidgetProps) => {
  const [resource, setResource] = useState<
    CloudinaryUploadWidgetInfo | string
  >();

  console.log("resource");
  console.log(resource);

  return (
    <CldUploadWidget
      // signatureEndpoint={`${endpoint.cloudinarySigning}?${params.PAYMENT_INTENT_ID}=${paymentIntentId}`}
      uploadPreset={preset}
      options={{
        sources: ["local"],
        clientAllowedFormats: ["image"],
        multiple: true,
        folder: `videobumper/orders/${paymentIntentId}`,
      }}
      onSuccess={(result) => {
        console.log(result);
        setResource(result?.info);
      }}
      // onQueuesEnd={(result, { widget }) => {
      //   widget.close();
      // }}
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
