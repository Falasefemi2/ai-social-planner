import { db } from "@/app/db";
import { AIOutput } from "@/app/db/schema";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
// import { format } from "date-fns";
// import Link from "next/link";
import HistoryTable from "./HitoryTable";



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
        // <Card className="w-full max-w-4xl">
        //     <CardHeader>
        //         <CardTitle>A list of your AI output history.</CardTitle>
        //     </CardHeader>
        //     <CardContent>
        //         {userHistory && userHistory.length > 0 ? (
        //             <Table>
        //                 <TableHeader>
        //                     <TableRow>
        //                         <TableHead>Template</TableHead>
        //                         <TableHead className="w-[250px]">Title</TableHead>
        //                         <TableHead>Description</TableHead>
        //                         <TableHead>AI Response</TableHead>
        //                         <TableHead className="text-right">Created At</TableHead>
        //                     </TableRow>
        //                 </TableHeader>
        //                 <TableBody>
        //                     {userHistory.map((history) => (
        //                         <Link key={history.id} href={`edit/${history.id}`}>
        //                             <TableRow className="cursor-pointer">
        //                                 <TableCell>{history.templateUsed}</TableCell>
        //                                 <TableCell className="w-[250px]">{history.title}</TableCell>
        //                                 <TableCell className="whitespace-pre-wrap">
        //                                     {history.description}
        //                                 </TableCell>
        //                                 <TableCell className="whitespace-pre-wrap line-clamp-2">
        //                                     {history.aiResponse}
        //                                 </TableCell>
        //                                 <TableCell className="text-right">
        //                                     {format(new Date(history.createdAt), "MM/dd/yyyy")}
        //                                 </TableCell>
        //                             </TableRow>
        //                         </Link>
        //                     ))}
        //                 </TableBody>
        //             </Table>
        //         ) : (
        //             <p className="font-bold text-xl">No history available</p>
        //         )}
        //     </CardContent>
        // </Card>
        <>
            <HistoryTable userHistory={userHistory || []} />
        </>
    );
}

