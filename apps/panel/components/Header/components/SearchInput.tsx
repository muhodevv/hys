import { Input } from "@/components/ui";
import { Search } from "lucide-react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

export function SearchInput() {
    const { register } = useForm()
    return <div className="min-w-[300px] lg:min-w-[600px]">
        <Input
            className="w-full"
            name="search"
            register={register}
            placeholder="Search"
            prefix={
                <Search size={18} />
            }
        />
    </div>
}