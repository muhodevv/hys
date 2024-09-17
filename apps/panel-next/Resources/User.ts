import { array, string } from "@/lib/utils";
import type { IUser } from "@/types";

export function User(data: any): IUser {
    return {
        _id: string(data?._id),
        firstName: string(data?.firstName),
        lastName: string(data?.lastName),
        email: string(data?.email),
        avatar: string(data?.avatar),
        stores: array(data?.stores),
    }
}