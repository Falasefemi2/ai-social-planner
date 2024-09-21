"use client";

// import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { CreditCard, History, WandSparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';

const menuList = [
    {
        name: "Content",
        icon: WandSparkles,
        path: "/dashboard",
    },
    {
        name: "Output History",
        icon: History,
        path: "/dashboard/history",
    },
    {
        name: "Upgrade",
        icon: CreditCard,
        path: "/dashboard/upgrade",
    },
];

export const Sidebar = () => {
    const path = usePathname();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
        };

        // Run the check on component mount
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isMobile) return null; // Hide Sidebar on mobile



    console.log("path", path);
    return (
        <div className="p-5 h-[800px] flex flex-col">
            <div className="mt-10 h-max flex flex-col justify-between">
                {menuList.map((menu) => (
                    <Link
                        href={menu.path}
                        key={menu.name}
                        className={cn(
                            "flex gap-2 mb-2 p-3  cursor-pointer rounded-lg items-center",
                            path === menu.path && ""
                        )}
                    >
                        <menu.icon className="h-6 w-6"></menu.icon>
                        <h2 className="text-lg">{menu.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};