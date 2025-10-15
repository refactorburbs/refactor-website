"use server";

import { pinata } from "@/pinata/config";

export async function uploadResumeToPinata(file: File): Promise<string> {
  try {
    const { cid } = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(cid);
    return url;
  } catch (error) {
    console.error("Pinata upload error:", error);
    throw new Error("Failed to upload resume to Pinata");
  }
}

async function extractFileIdFromPinataUrl(url: string): Promise<string | null> {
  try {
    // Pinata URLs typically look like:
    // https://gateway.pinata.cloud/ipfs/QmXXXXXX

    const urlParts = url.split("/");
    const ipfsIndex = urlParts.findIndex(part => part === "ipfs");

    if (ipfsIndex === -1 || !urlParts[ipfsIndex + 1]) {
      console.warn("Could not extract CID from URL:", url);
      return null;
    }

    const cid = urlParts[ipfsIndex + 1];
    const response = await pinata.files.public.list().limit(9999);

    if (!response.files) {
      console.log("No files found in Pinata");
      return null;
    }

    const file = response.files.find(f => f.cid === cid);
    if (file && file.id) {
      console.log(`✅ Found Pinata file ID: ${file.id}`);
      return file.id;
    }

    console.log(`❌ No Pinata file found with CID: ${cid}`);
    return null;

  } catch (error) {
    console.error("Error extracting CID and ID from URL:", error);
    return null;
  }
}

export async function deleteFileFromPinata(resumeUrl: string): Promise<boolean> {
  try {
    const fileId = await extractFileIdFromPinataUrl(resumeUrl);
    console.log("Extracted file ID from resume URL:", fileId);

    if (!fileId) {
      console.warn("Could not extract CID from resume URL, skipping Pinata deletion:", resumeUrl);
      return false;
    }

    // Delete the file from Pinata
    await pinata.files.public.delete([fileId]);

    console.log(`✅ Successfully deleted file from Pinata: ${fileId}`);
    return true;

  } catch (error) {
    console.error("❌ Error deleting file from Pinata:", error);

    // Check if it's a "file not found" error (which is okay - file might already be deleted)
    if (error instanceof Error && error.message.includes("not found")) {
      console.log("File not found in Pinata (may have been already deleted)");
      return true; // Consider this a success since the file is gone
    }

    // For other errors, log but don't fail the deletion process
    console.warn("Pinata deletion failed but continuing with database deletion");
    return false;
  }
}