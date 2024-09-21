"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryProps } from "./categories";
import { cn } from "@/lib/utils";
import qs from "query-string";
import { Button } from "@/components/ui/button";

export const CategoryItem = ({ name, value }: CategoryProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category");

    const isSelected = currentCategory === value;

    const handleOnClick = () => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: {
                    category: isSelected ? null : value,
                },
            },

            { skipNull: true, skipEmptyString: true }
        );

        router.push(url);
    };

    return (
        <Button
            onClick={handleOnClick}
            className={cn(
                "py-2 px-4 text-sm rounded-full flex items-center cursor-pointer"
            )}
        >
            {name}
        </Button>
    );
};