"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UpgradePage() {

    const router = useRouter();

    const handleOnClick = async () => {
        const response = await axios.post("/api/upgrade/checkout");
        // push user to the stripe url
        router.push(response.data.url);
    };


    return (
        <div className="mx-5 py-2">
            <h2>Upgrade Credit</h2>
            <div className="mt-5 py-6 px-4">
                <Card className="w-[350px] flex flex-col mx-auto">
                    <CardHeader>
                        <CardTitle>$10 One-Time Purchase</CardTitle>
                        <CardDescription>10,000 AI Credit</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                                <Check /> <span>100,000 words/purchase</span>
                            </div>
                            <div className="flex items-center">
                                <Check /> <span>All Template Access</span>
                            </div>
                            <div className="flex items-center">
                                <Check /> <span>Retain All History</span>
                            </div>
                        </div>
                        <Button className="mt-5" onClick={handleOnClick}>Purchase</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}