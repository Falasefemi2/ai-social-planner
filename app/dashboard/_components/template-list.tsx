
"use client";

import { useEffect, useState } from "react";

import { contentTemplates } from "@/lib/content-templates";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const TemplateList = ({ searchInput }: { searchInput: string }) => {
    const [templateList, setTemplateList] = useState(contentTemplates);

    const searchParams = useSearchParams();
    const searchCategory = searchParams.get("category");

    useEffect(() => {
        if (searchCategory === "All") {
            setTemplateList(contentTemplates);
        } else if (searchCategory) {
            const filteredTemplates = contentTemplates.filter(
                (item) => item.category === searchCategory
            );
            setTemplateList(filteredTemplates);
        } else {
            setTemplateList(contentTemplates);
        }
    }, [searchCategory]);

    // Search Input
    useEffect(() => {
        if (searchInput && searchInput.length > 2) {
            const filteredTemplates = contentTemplates.filter((item) =>
                item.name.toLowerCase().includes(searchInput.toLowerCase())
            );

            setTemplateList(filteredTemplates);
        } else {
            setTemplateList(contentTemplates);
        }
    }, [searchInput]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-5 mt-5">
            {templateList.map((template) => (
                <Card key={template.slug} className="w-full h-[200px]">
                    <Link href={`/dashboard/${template.slug}`} className="block h-full">
                        <CardContent className="h-full flex flex-col justify-center items-center p-4">
                            <template.icon className="h-12 w-12" />
                            <CardHeader className="mt-5 p-0">
                                <h2 className="font-semibold">{template.name}</h2>
                            </CardHeader>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
    );
};


