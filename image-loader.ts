export default function imageLoader({ src }: { src: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (base && src.startsWith("/") && !src.startsWith(`${base}/`)) {
    return `${base}${src}`;
  }
  return src;
}
