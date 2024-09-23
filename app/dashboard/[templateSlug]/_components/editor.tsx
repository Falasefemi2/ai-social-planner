"use client";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner"


export const Editor = ({ value }: { value: string }) => {
    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill"), { ssr: false }),
        []
    );

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        toast("Copied to clipboard!");
    };

    return (
        <>
            <div className="flex justify-end mb-2">
                <Button onClick={handleCopy}>
                    Copy
                </Button>
            </div>
            <ReactQuill
                theme="snow"
                value={value}
                className="h-[350px] pb-10 whitespace-pre-wrap"
            ></ReactQuill>
        </>
    );
};