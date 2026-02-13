"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

type FileUploadProps = {
  onChange: (value?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
};

export default function FileUpload({
  onChange,
  endpoint,
  value,
}: FileUploadProps) {
  // Parse file object nếu có
  const file = value ? JSON.parse(value) : null;

  const isPdf = file?.type === "application/pdf";
  const isImage = file?.type?.startsWith("image/");

  // ================= IMAGE =================
  if (file && isImage) {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={file.url}
          alt={file.name}
          className="rounded-full object-cover"
        />
        <button
          type="button"
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // ================= PDF =================
  if (file && isPdf) {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline truncate max-w-50"
        >
          {file.name}
        </a>
        <button
          type="button"
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // ================= UPLOAD =================
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const uploadedFile = res?.[0];

        if (!uploadedFile) return;

        onChange(
          JSON.stringify({
            url: uploadedFile.url,
            type: uploadedFile.type,
            name: uploadedFile.name,
          }),
        );
      }}
      onUploadError={(error: Error) => {
        console.log("UPLOAD ERROR:", error);
      }}
    />
  );
}
