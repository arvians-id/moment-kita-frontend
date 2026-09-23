import type { ImageLoaderProps } from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const url = src.startsWith("/") ? `${basePath}${src}` : src;
  const separator = url.includes("?") ? "&" : "?";

  return `${url}${separator}w=${width}&q=${quality ?? 75}`;
}
