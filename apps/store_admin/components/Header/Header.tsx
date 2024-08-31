"use client"
import { ProfileMenu } from "./components/ProfileMenu";
import { SearchInput } from "./components/SearchInput";

export function Header() {
    return <div className="bg-white border-b flex items-center justify-between px-4 h-[65px]">
        <SearchInput />
        <ProfileMenu />
    </div>
}