"use client";
import { useState } from "react";

export type errorResponse = {
  message: string;
  field?: string | undefined;
}[];
export default ({
  url,
  method,
  body,
}: {
  url: string;
  method: string;
  body: any;
}) => {
  const [error, setError] = useState<errorResponse | null>(null);
  const doRequest = async () => {
    try {
      const response = await fetch("/api/users/signup", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const res = await response.json();
      if (res.ok) {
        return res;
      } else {
        setError(res.errors);
      }
    } catch (err: any) {
      console.log(err.response);
      setError(err?.response?.errors || [{ message: "Server Error!" }]);
    }
  };

  return { doRequest, error };
};
