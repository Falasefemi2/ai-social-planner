/* eslint-disable react/no-unescaped-entities */

"use client";
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { CreditCard, History, WandSparkles } from "lucide-react";
import { cn } from "@/lib/utils";


import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import { usePathname } from "next/navigation";


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


export const Navbar = () => {
    const path = usePathname();

    return (
        <div className="flex items-center justify-end p-4">
            <ModeToggle />
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Menu className="h-8 w-8 ml-4 cursor-pointer" />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>LOGO</SheetTitle>
                        </SheetHeader>
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
                    </SheetContent>
                </Sheet>

            </div>
        </div>
    )
}