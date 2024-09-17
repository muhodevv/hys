import { UseTranslate } from "@/types";
import { z } from "zod";

export const loginFormSchema = (t: UseTranslate) => z.object({
    email: z
        .string()
        .min(1, {
            message: t("requiredValidationError", { field: t("emailAddress") }),
        })
        .email(t("invalidEmailValidationError")),
    password: z
        .string()
        .min(6, t("minValidationError", { field: t("password"), count: 6 }))
        .max(20, t("maxValidationError", { field: t("password"), count: 20 })),
    acceptTOS: z.boolean().refine((data) => data === true, {
        message: t("requiredValidationError", { field: t("terms") }),
    }),
});
