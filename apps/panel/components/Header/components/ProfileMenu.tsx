import { Button } from "@/components/ui";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileMenu() {
    const router = useRouter();
    const { user, logout, stores, activeStoreId } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-0 overflow-hidden rounded-full">
                    <Avatar>
                        <AvatarFallback className="bg-purple-600 text-white">
                            {user?.firstName?.[0]?.toUpperCase()}{" "}
                            {user?.lastName?.[0]?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="flex items-center gap-x-2">
                    <div>
                        <Avatar>
                            <AvatarFallback className="bg-purple-600 text-white">
                                {user?.firstName?.[0]?.toUpperCase()}{" "}
                                {user?.lastName?.[0]?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <div>
                            {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground">{user?.email}</div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Help Center</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex items-center justify-between">
                    <div>My Stores</div>
                    <Button variant="outline" size="iconSm">
                        <PlusIcon size={14} />
                    </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={activeStoreId || ""}
                    onValueChange={(val) => {
                        const store = stores.find((store) => store._id === val);
                        localStorage.setItem("activeStoreId", val);
                        router.push(`/${store?.key}`);
                    }}
                >
                    {stores.map((store) => (
                        <DropdownMenuRadioItem
                            indicator={<CheckIcon size={16} />}
                            key={store._id}
                            value={store._id}
                        >
                            {store.name}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        logout();
                    }}
                    className="text-red-500"
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
