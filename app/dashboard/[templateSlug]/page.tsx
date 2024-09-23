"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { contentTemplates } from "@/lib/content-templates";
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Loader } from "lucide-react"
import { Editor } from "./_components/editor"
import { chatSession } from "@/lib/gemini-ai";
import { createDocument } from "@/app/action"
import { toast } from "sonner"



const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required.",
    }),
    description: z.string().min(1, {
        message: "Description is required.",
    }),
});

interface TemplateSlugProps {
    params: {
        templateSlug: string;
    }
}

export default function TemplateSlug({ params }: TemplateSlugProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState("");

    const selectedTemplate = contentTemplates.find(
        (item) => item.slug === params.templateSlug
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const selectedPrompt = selectedTemplate?.aiPrompt;
        const finalAIPrompt = JSON.stringify(values) + ", " + selectedPrompt;

        try {
            // Generate content using AI
            const aiResult = await chatSession.sendMessage(finalAIPrompt);
            setAiResponse(aiResult.response.text());

            const docResult = await createDocument({
                title: values.title,
                templateUsed: selectedTemplate?.name || 'Unknown Template',
                airesponse: aiResult.response.text(),
                description: values.description
            });

            if (docResult.success) { // Check success directly
                toast.success("CONTENT CREATED");
            } else {
                console.error("Failed to save document:", docResult.error);
                toast.error(docResult.error); // Show the error message
            }
        } catch (error) {
            console.error("Error in submission:", error);
            toast.error("Submission failed. Please try again."); // Show a user-friendly error
        } finally {
            setIsLoading(false);
        }
    }

    if (!selectedTemplate) {
        return <div>Template not found</div>;
    }

    return (
        <div className="mx-5 py-2">
            <div className="mr-5 py-6 px-4">
                <h2>{selectedTemplate.name}</h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-col gap-4 p-5 mt-5">
                        {selectedTemplate.form?.map((formItem) => (
                            <FormField
                                key={formItem.label}
                                control={form.control}
                                name={formItem.field === "input" ? "title" : "description"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{formItem.label}</FormLabel>
                                        <FormControl>
                                            {formItem.field === "input" ? (
                                                <Input {...field} />
                                            ) : (
                                                <Textarea {...field} />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                    <Button className="mt-5" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <Loader className="animate-spin" />
                        ) : (
                            "Generate Content"
                        )}
                    </Button>
                </form>
            </Form>
            <div className="my-10">
                <Editor value={isLoading ? "Generating..." : aiResponse} />
            </div>
        </div>
    )
}