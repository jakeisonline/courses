import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCityNameUpperCase(city: string) {
  return city.charAt(0).toUpperCase() + city.slice(1)
}
