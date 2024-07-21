"use client";

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { useConvex, useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react';

type Props = {}

export default function DashBoard() {
  const [user, setUser] = useState<any>(null);
  const [authStatus, setAuthStatus] = useState<any>(null);
  const convex = useConvex();
  const createUser = useMutation(api.user.createUser);

  // * This useEffect is responsible to fetch data from Kinde and create user if it doesn't exist in convex.
  // * The useEffect runs 2ice, that's why we should add `reactStrictMode: false` in next.config.mjs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Kinde session data
        const res = await fetch("/api/kindeSession");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUser(data.user);
        setAuthStatus(data.authenticated);
        console.log("Fetched user:", data.user);

        // Check if user exists and create if not
        if (data.user) {
          // *Skipping query, if it is taking a minimum loading time
          const result = await convex.query(api.user.getSingleUser, { email: data.user.email });
          console.log("Fetched user from query:", result);

          if (!result.length) {
            console.log("User does not exist. Creating user...");
            const newUser = await createUser({
              name: data.user.given_name,
              email: data.user.email,
              image: data.user.picture
            });
            console.log("User created successfully:", newUser);
          } else {
            console.log("User already exists:", result);
          }
        }
      } catch (error) {
        console.error("Error during data fetching or user creation:", error);
      }
    };

    fetchData();
  }, [convex, createUser]);

  return (
    <div>
      <LogoutLink>
        <Button>
          Logout
        </Button>
      </LogoutLink>
    </div>
  );
}
