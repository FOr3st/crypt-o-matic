import { STORAGE_NAME } from "src/constants";

export function storageSave(value: string) {
  localStorage.setItem(STORAGE_NAME, value);
}

export function storageLoad() {
  return localStorage.getItem(STORAGE_NAME);
}
