import Link from "next/link"
import {
    Home,
    LineChart,
    Package,
    Package2,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Divider } from "@/components/ui"
import { cn } from "@/lib/utils"

export const description =
    "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images."

const SIDEBAR_ITEMS = [
    {
        icon: Home,
        label: "Dashboard",
    },
    {
        icon: ShoppingCart,
        label: "Orders",
    },
    {
        icon: Package,
        label: "Products",
    },
    {
        icon: Users2,
        label: "Customers",
    },
    {
        icon: LineChart,
        label: "Analytics",
    },
]

function SidebarItems({ items, title }: { title?: string, items: { icon: any, label: string }[] }) {
    return <div className="px-6 flex-1 w-full flex flex-col items-start gap-5">
        {
            title && <div className="text-sm text-muted-foreground">{title}</div>
        }
        {
            items.map((item, index) => {
                const Icon = item.icon
                return <SidebarItem active={index === 1} icon={Icon} label={item.label} key={index} />
            })
        }
    </div>
}

function SidebarItem({ icon: Icon, label, active }: {
    icon: any,
    label: string,
    active: boolean
}) {
    return <Link
        href="#"
        className={cn(
            "w-full flex items-center flex-1 px-2 py-1.5 rounded-lg text-accent-foreground/80 gap-x-2 transition-colors hover:text-foreground",
            { "bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-lg text-foreground": active }
        )}
    >
        <Icon className="h-5 w-5" />
        <div className="text-base">
            {label}
        </div>
    </Link >
}

export function Sidebar() {
    return (
        <aside className="sticky inset-y-0 left-0 z-10 hidden w-64 flex-col bg-background sm:flex min-h-screen">
            <nav className="flex flex-col items-start flex-1">
                <div className="px-6 py-4 border-b w-full flex items-center gap-x-2">
                    <Link
                        href="#"
                        className="group flex h-9 w-9 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    </Link>
                    <span className="font-bold">Ecom</span>
                </div>
                <div className="py-6 w-full border-r flex-1">
                    <SidebarItems items={SIDEBAR_ITEMS} />
                </div>
                {/* <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Package className="h-5 w-5" />
                                <span className="sr-only">Products</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Products</TooltipContent>
                    </Tooltip> */}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4 border-t border-r">
                <SidebarItems items={[
                    {
                        icon: Settings,
                        label: "Settings",
                    },
                ]} />
            </nav>
        </aside>
    )
}
