"use client";

import React from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { useRouter } from 'next/navigation';


interface HistoryItem {
    id: string;
    templateUsed: string;
    title: string;
    description: string;
    aiResponse: string;
    createdAt: Date;
}

interface HistoryTableProps {
    userHistory: HistoryItem[];
}



const HistoryTable = ({ userHistory }: HistoryTableProps) => {
    const router = useRouter();

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>A list of your AI output history.</CardTitle>
            </CardHeader>
            <CardContent>
                {userHistory && userHistory.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Template</TableHead>
                                <TableHead className="w-[250px]">Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>AI Response</TableHead>
                                <TableHead className="text-right">Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userHistory.map((history) => (
                                <TableRow
                                    key={history.id}
                                    className="cursor-pointer"
                                    onClick={() => router.push(`edit/${history.id}`)}
                                >
                                    <TableCell>{history.templateUsed}</TableCell>
                                    <TableCell className="w-[250px]">{history.title}</TableCell>
                                    <TableCell className="whitespace-pre-wrap">
                                        {history.description}
                                    </TableCell>
                                    <TableCell className="whitespace-pre-wrap line-clamp-2">
                                        {history.aiResponse}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {history.createdAt ? format(new Date(history.createdAt), "MM/dd/yyyy") : ''}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="font-bold text-xl">No history available</p>
                )}
            </CardContent>
        </Card>
    )

}

export default HistoryTable