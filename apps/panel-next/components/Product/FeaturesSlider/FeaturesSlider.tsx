import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function FeaturesSlider() {
    const t = useTranslations("Auth");

    return (
        <div className="bg-indigo-600 sticky pt-20 w-full">
            <h2 className="text-4xl font-bold text-center text-zinc-50">
                {t("welcomeTitle")}
            </h2>
            <p className="text-center text-lg pt-2 text-zinc-100">
                {t("welcomeMessage")}
            </p>
            <div className="flex items-center my-10 mx-8">
                <img src="/login.png" className="w-full flex rounded-lg" />
            </div>
            <div>
                <p className="text-center mb-5 text-zinc-100 text-lg font-medium">
                    {t("showPerformanceOfYourStore")}
                </p>
                <div className="flex items-center justify-center gap-x-2">
                    {[1, 2, 3].map((_dot, ind) => (
                        <div key={ind}>
                            <div
                                className={cn("rounded-full bg-white/50 w-2 h-2", {
                                    "bg-white": ind === 0,
                                })}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
