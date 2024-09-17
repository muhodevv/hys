import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { ReactNode } from "react"

export default function StoreLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full bg-muted/40 items-start">
            <Sidebar />
            <div className="flex-1">
                <Header />
                {children}
            </div>
        </div>
    )
}