import { db } from "@/app/db";
import { AIOutput } from "@/app/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { format } from "date-fns";



export default async function HistoryPage() {
    const { userId } = auth();
    let userHistory = null;

    if (userId) {
        userHistory = await db
            .select()
            .from(AIOutput)
            .where(eq(AIOutput.userId, userId))
            .execute();
    }

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>A list of your ai output history.</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Template</TableHead>
                            <TableHead className="w-[250px]">Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userHistory && userHistory.length > 0
                            ? userHistory.map((history) => (
                                <TableRow key={history.id}>
                                    <TableCell>{history.templateUsed}</TableCell>
                                    <TableCell className="w-[250px]">{history.title}</TableCell>
                                    <TableCell className="whitespace-pre-wrap">
                                        {history.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {format(history.createdAt, "MM/dd/yyyy")}
                                    </TableCell>
                                </TableRow>
                            ))
                            : (
                                <p className="flex items-center justify-center font-bold text-2xl">No history available</p>
                            )}
                    </TableBody>

                </Table>
            </CardContent>
        </Card>
    )
}