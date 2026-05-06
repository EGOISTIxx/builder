// shared/lib/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: unknown[]) {
  return twMerge(clsx(args));
}
