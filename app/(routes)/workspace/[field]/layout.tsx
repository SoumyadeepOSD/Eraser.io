"use client";

import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
    children: React.ReactNode;
};

const DynamicRouteLayout = ({ children }: Props) => {
    const convex = useConvex();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/kindeSession");
                const data = await response.json();
                setUser(data?.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const checkUser = async () => {
        try {
            const result = await convex.query(api.user.getSingleUser, { email: user?.email });
            if (!result.length) {
                router.push("/dashboard");
                toast.error("You are not authenticated");
            }
        } catch (error) {
            console.error("Error checking user:", error);
            router.push("/dashboard");
            toast.error("Error checking user authentication");
        }
    };

    useEffect(() => {
        if (user?.email) {
            checkUser();
        }
    }, [user?.email]);

    if (!user) {
        return <div>Loading...</div>; // Optionally, add a loading state
    }

    return <div>{children}</div>;
};

export default DynamicRouteLayout;
