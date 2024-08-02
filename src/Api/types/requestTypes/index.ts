import { Request } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RequestOptions<T = any> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  req?: Request;
  data?: T;
}
