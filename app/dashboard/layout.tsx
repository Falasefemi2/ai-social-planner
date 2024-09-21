import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="flex-1 p-5">
                    {children}
                </div>
            </div>
        </div>
    )
}