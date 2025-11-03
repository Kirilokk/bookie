import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";


export function isInvalidText(text) {
    return !text || text.trim().length === 0;
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
