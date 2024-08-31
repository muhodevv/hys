import { Button } from "@/components/ui";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers";
import { useState } from "react";

export function ProfileMenu() {
    const [position, setPosition] = useState("top")
    const { user } = useAuth()
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-0 overflow-hidden rounded-full">
                <Avatar>
                    <AvatarFallback className="bg-purple-600 text-white">
                        {user?.firstName?.[0]?.toUpperCase()} {user?.lastName?.[0]?.toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}