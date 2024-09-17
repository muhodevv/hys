import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginForm } from "@/types/Auth";

import { loginFormSchema } from "./schema";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useAuth } from "@/providers";

export default function LoginFormComp() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);

  const { loginLoading, error, login } = useAuth();
  const { handleSubmit, register, formState, control } =
    useForm<LoginForm>({
      values: {
        email: "",
        password: "",
        acceptTOS: false,
      },
      resolver: zodResolver(loginFormSchema(t)),
    });

  const onSubmit = (values: LoginForm) => {
    login(values);
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-xl mx-auto mt-10">
        <div className="">
          <div className="px-4 sm:px-7">
            {/* <h4 className="text-center mb-7">{t("loginHeroText")}</h4> */}
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                {t("login")}
              </h1>
              <p className="mt-2 text-sm text-gray-600 gap-x-2 flex items-center justify-center">
                <span>{t("dontHaveAnAccount")}</span>
                <Link
                  href={"/register"}
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                >
                  {t("signUp")}
                </Link>
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
                    name="email"
                    type="email"
                    register={register}
                    label={t("emailAddress")}
                    error={formState.errors.email?.message}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    register={register}
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
                  <div>
                    <div className="flex items-center">
                      <Controller
                        name="acceptTOS"
                        control={control}
                        render={({ field }) => (
                          <input
                            id="acceptTOS"
                            checked={!!field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            onBlur={field.onBlur}
                            type="checkbox"
                            className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                          />
                        )}
                      />
                      <div className="ml-3">
                        <label htmlFor="acceptTOS" className="text-sm">
                          {t("iAcceptTheTOS")
                            .split("{{TOS}}")
                            .map((splittedText, ind) =>
                              splittedText === "" ? (
                                <a
                                  key={ind}
                                  className="text-blue-600 decoration-2 hover:underline font-medium"
                                  href="#"
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
                    {formState.errors?.acceptTOS && (
                      <p className="text-sm text-red-500">
                        {formState.errors?.acceptTOS?.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="py-3 px-4 bg-black text-white inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm disabled:opacity-60  "
                  >
                    {t("login")}
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
