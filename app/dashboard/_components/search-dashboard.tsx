
// import { Auth } from "@/components/auth";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Categories } from "./categories";
import { Input } from "@/components/ui/input";
// import { Categories } from "./categories";

const categories = [
    {
        name: "All",
        value: "All",
    },
    {
        name: "Youtube",
        value: "Youtube",
    },
    {
        name: "Instagram",
        value: "Instagram",
    },
    {
        name: "Tiktok",
        value: "Tiktok",
    },
    {
        name: "Linkedin",
        value: "Linkedin",
    },
    {
        name: "Tweet",
        value: "Tweet",
    },
];

export const SearchDashboard = ({
    onSearchInput,
}: {
    onSearchInput: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
    return (
        <div className="mx-5 py-2">
            <div className="flex flex-col md:flex-row gap-4 mt-5 py-6 px-4 rounded">
                <div className="w-full md:w-[30%]">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 w-full"
                            onChange={(e) => onSearchInput(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-full md:flex-1">
                    <Categories items={categories} />
                </div>
                <div className="md:ml-auto">
                    {/* <Auth /> */}
                </div>
            </div>
        </div>
    );
};


