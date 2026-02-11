"use client";
import { UploadDropzone } from "@/lib/uploadthing";

import { X } from "lucide-react";
import Image from "next/image";

type FileUploadProps = {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
};
export default function FileUpload({
  onChange,
  endpoint,
  value,
}: FileUploadProps) {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="upload" className="rounded-full" />
        <button
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          onClick={() => onChange("")}
          type="button"
        >
          <X className="h-4 w-4 cursor-pointer" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      className="my-custom-dropzone"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
