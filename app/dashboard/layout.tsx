import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col"> {/* {{ edit_4 }} */}
                <Navbar />
                <div className="flex-1 p-5"> {/* {{ edit_7 }} */}
                    {children}
                </div>
            </div>
        </div>
    )
}