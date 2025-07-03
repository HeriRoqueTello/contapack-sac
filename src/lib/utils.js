import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
// a
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
