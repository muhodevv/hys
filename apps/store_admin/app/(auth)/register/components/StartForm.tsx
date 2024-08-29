import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@components/ui";
import { useAuth } from "@/providers";
import { RegisterStoreForm } from "@/types";
import { SUBDOMAIN_ORIGIN } from "@/@constants";
import { RegistrationSchema } from "./shema";

export default function StartForm() {
    const t = useTranslations("auth");
    const [showPassword, setShowPassword] = useState(false);

    const { error, registerStore, registerLoading } = useAuth();

    const { handleSubmit, register, formState, setValue } = useForm<RegisterStoreForm>({
        values: {
            email: "",
            firstName: "",
            lastName: "",
            isAcceptedTerms: false,
            password: "",
            confirmPassword: "",
            storeName: "",
            subdomain: "",
        },
        resolver: zodResolver(RegistrationSchema(t))
    });

    const onSubmit = (values: RegisterStoreForm) => {
        registerStore(values);
    };

    return (
        <div className="w-full">
            <div className="w-full max-w-xl mx-auto">
                <div>
                    <div>
                        {/* <h4 className="text-center mb-7">{t("signInDesc")}</h4> */}
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 ">
                                {t("signUp")}
                            </h1>
                            <p className="mt-2 text-sm text-gray-600 ">
                                {t("alreadyHaveAccount")}
                                <a
                                    className="text-blue-600 decoration-2 hover:underline font-medium pl-2"
                                    href="/login"
                                >
                                    {t("signInHere")}
                                </a>
                            </p>
                            {error && (
                                <div className="text-sm border-2 border-red-500 bg-red-50 text-red-600 rounded-md px-4 py-4 mt-5">
                                    {error?.toString()}
                                </div>
                            )}
                        </div>

                        <div className="mt-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-y-6">
                                    <Input
                                        name="storeName"
                                        register={register}
                                        label={t("storeName")}
                                        error={formState.errors.storeName?.message}
                                    />
                                    <Input
                                        name="subdomain"
                                        register={register}
                                        label={t("domain")}
                                        suffix={SUBDOMAIN_ORIGIN}
                                        help={t("subdomainHelpDescription")}
                                        error={formState.errors.subdomain?.message}
                                    />
                                    <div className="grid lg:grid-cols-2 gap-x-4 gap-y-4">
                                        <Input
                                            name="firstName"
                                            register={register}
                                            label={t("firstName")}
                                            error={formState.errors.firstName?.message}
                                        />
                                        <Input
                                            name="lastName"
                                            register={register}
                                            label={t("lastName")}
                                            error={formState.errors.lastName?.message}
                                        />
                                    </div>
                                    <Input
                                        name="email"
                                        type="email"
                                        register={register}
                                        autoComplete="new-password"
                                        label={t("emailAddress")}
                                        error={formState.errors.email?.message}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        register={register}
                                        autoComplete="new-password"
                                        label={t("password")}
                                        error={formState.errors.password?.message}
                                        suffix={
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="text-sm flex items-center justify-center bg-transparent"
                                            >
                                                {showPassword ? (
                                                    <EyeOffIcon size={16} />
                                                ) : (
                                                    <EyeIcon size={16} />
                                                )}
                                            </button>
                                        }
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        register={register}
                                        label={t("confirmPassword")}
                                        autoComplete="new-password"
                                        error={formState.errors.confirmPassword?.message}
                                        suffix={
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="text-sm flex items-center justify-center bg-transparent"
                                            >
                                                {showPassword ? (
                                                    <EyeOffIcon size={16} />
                                                ) : (
                                                    <EyeIcon size={16} />
                                                )}
                                            </button>
                                        }
                                    />
                                    <div>
                                        <div className="flex items-center">
                                            <div className="flex">
                                                <input
                                                    id="accept-terms"
                                                    type="checkbox"
                                                    {...register("isAcceptedTerms")}
                                                    className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <label htmlFor="accept-terms" className="text-sm ">
                                                    {t("iAcceptTheTOS")
                                                        .split("{{TOS}}")
                                                        .map((splittedText: string, ind: number) =>
                                                            splittedText === "" ? (
                                                                <a
                                                                    key={ind}
                                                                    className="text-blue-600 decoration-2 hover:underline font-medium"
                                                                    href="https://navisio.eu/tos"
                                                                >
                                                                    {t("TOS")}
                                                                </a>
                                                            ) : (
                                                                <span key={ind}>{splittedText}</span>
                                                            )
                                                        )}
                                                </label>
                                            </div>
                                        </div>
                                        {formState.errors?.isAcceptedTerms && (
                                            <p className="text-sm text-red-500">
                                                {formState.errors?.isAcceptedTerms?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        {/* <ReCAPTCHA
                      sitekey="6LeC9sgoAAAAAECvTt1OF_Phev-ejeS2ylOqA4pj"
                      onChange={(token) => {
                        setValue("captchaToken", token ?? "");
                      }}
                    /> */}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={registerLoading}
                                        className="disabled:opacity-60 py-3 px-4 bg-black text-white inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                                    >
                                        {t("signUp")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
