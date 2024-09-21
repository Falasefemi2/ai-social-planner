import { ModeToggle } from "@/components/mode-toggle"

export const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="text-lg font-bold">Logo</div>
            <ModeToggle />

        </div>
    )
}