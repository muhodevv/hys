"use client"
import { useTranslations } from "next-intl";

export default function RegisterPage() {
    const t = useTranslations('HomePage');
    return (
        <div className="block lg:flex items-start gap-x-2">
            {t("title")}
        </div>
    );
}