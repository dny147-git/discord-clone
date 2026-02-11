import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing({
  /**
   * Log out more information about the error, but don't return it to the client
   * @see https://docs.uploadthing.com/errors#error-formatting
   */
  errorFormatter: (err) => {
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return { message: err.message };
  },
});

async function handleAuth() {
  const { userId } = await auth();
  console.log("UPLOADTHING userId:", userId);

  if (!userId) {
    throw new UploadThingError("Unauthorized");
  }

  return { userId };
}

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),

  messageFile: f(["image", "pdf"])
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
