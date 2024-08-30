import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function string(value: any): string {
  return value?.toString() || ""
}

export function number(value: any): number {
  return parseInt(value) || 0
}

export function boolean(value: any): boolean {
  return !!value
}

export function array<T>(value: any): T[] {
  return Array.isArray(value) ? value : []
}