"use server";
import { API } from "@/hooks/getApi";

export const getRequest = async (url: string) => {
  const res = await fetch(`${API}${url}`);
  const data = res.json();
  return data;
};
