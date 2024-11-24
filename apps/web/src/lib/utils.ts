import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function notNanOrDefault(number?: number | string | null, defaultValue = 0) {
  if (number === undefined || number === null) {
    return defaultValue;
  }

  const value = parseFloat(number.toString());

  if (!isNaN(value)) {
    return value;
  }

  return defaultValue;
}

export function handleCopyLink(link: string, title: string) {
  navigator.clipboard.writeText(`${window.location.origin}/p/${link}`);
  toast.success("Link copied to clipboard", {
    description: title,
  });
}

export function humanFileSize(size: number) {
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return +(size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
}

export function formatSecondsToTimestamp(seconds: number) {
  if (seconds < 0) {
    return "";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = (seconds % 60).toFixed(0);

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  } else {
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {},
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export const IMAGE_LINKS = [
  "https://utfs.io/f/GtjuzTxrWKtnc6xRppAT9nGXFIZqmMfu6KvNV0jWoxkREwr8",
  "https://utfs.io/f/GtjuzTxrWKtnRbq0BufgEfAxHGYODCt4ko9J7qrb0Nnlywep",
];