"use client";
import axios from "axios";
import useSWR from "swr";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";

// Define Server Action for handling cookie manipulation (if needed)
// ...

// Client-side data fetching function
const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

type UserResponse = {
  currentUser: {
    email: string;
    id: string;
    iat?: number;
  };
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch user data using Server Action or client-side fetching
  const { data, error, isLoading, isValidating } = useSWR<UserResponse>(
    "/api/users/currentuser",
    fetcher
  );

  useEffect(() => {
    if (data && data.currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [data]);

  const handleSignOut = async () => {
    try {
      await fetch("/api/users/signout");
      setIsLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav className="flex justify-end w-full">
        {isLoggedIn ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <Link href="/signin">Sign In</Link>
        )}
      </nav>

      <div>
        {isLoading ? (
          <>Loading...</>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : data && data.currentUser ? (
          <h1>Welcome, {data.currentUser.email}!</h1>
        ) : (
          <p>Please sign in to view your profile.</p>
        )}
      </div>
    </main>
  );
}
