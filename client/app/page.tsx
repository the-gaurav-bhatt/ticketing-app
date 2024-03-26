"use client";
import axios from "axios";
import useSWR from "swr";
import { Suspense } from "react";
// import Error from "next/error";
// Define Server Action for handling cookie manipulation
// "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
// {
//   headers: {
//     Host: "ticketing.dev",
//   },
// }
//for client side
const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
}; // async function getUserDataServerAction() {
//   try {
//     const res = await axios.get("/api/users/currentuser");

//     return res.data;
//   } catch (err: any) {
//     console.error("error for:", err);
//     return {}; // Return an empty object or appropriate default value on error
//   }
// }

type userResponse = {
  currentUser: {
    email: string;
    id: string;
    iat?: number;
  };
};
// Home component (enhanced with Server Action)
export default function Home() {
  // Fetch data using Server Action
  const { data, error, isLoading, isValidating } = useSWR<userResponse>(
    "/api/users/currentuser",
    fetcher
  );
  if (isLoading) {
    return <>Loading...</>;
  }
  console.log(data);
  if (data)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <h1>email:{data.currentUser?.email}</h1>
        </div>
      </main>
    );
}
