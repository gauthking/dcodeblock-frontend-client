/**
 * Combines and merges multiple CSS class values using the `clsx` utility from `clsx` package
 * and `twMerge` from `tailwind-merge`.
 *
 * @param {...ClassValue[]} inputs - An array of CSS class values to merge.
 * @returns {string} - A string representing the merged CSS classes.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
