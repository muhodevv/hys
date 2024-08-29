import { UseTranslate } from "@/types";
import { z } from "zod";

export const RegistrationSchema = (t: UseTranslate) => z
  .object({
    firstName: z
      .string()
      .min(1, t("requiredValidationError", { field: t("firstName") }))
      .max(50, t("maxValidationError", { field: t("firstName"), count: 50 })),
    lastName: z
      .string()
      .min(1, t("requiredValidationError", { field: t("lastName") }))
      .max(50, t("maxValidationError", { field: t("lastName"), count: 50 })),
    email: z.string().email(t("invalidEmailValidationError")),
    password: z
      .string()
      .min(6, t("minValidationError", { field: t("password"), count: 6 }))
      .max(20, t("maxValidationError", { field: t("password"), count: 20 })),
    confirmPassword: z.string(),
    storeName: z
      .string()
      .min(3, t("minValidationError", { field: t("storeName"), count: 3 }))
      .max(20, t("maxValidationError", { field: t("storeName"), count: 20 })),
    subdomain: z
      .string()
      .min(3, t("minValidationError", { field: "Doamin", count: 3 }))
      .max(50, t("maxValidationError", { field: "Doamin", count: 25 })),
    isAcceptedTerms: z.boolean().refine((data) => data === true, {
      message: t("requiredValidationError", { field: t("terms") }),
    }),
    //captchaToken: z.string().min(10),
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .refine((data: any) => data.password === data.confirmPassword, {
    message: t("passwordsNotMatch"),
    path: ["confirmPassword"], // path of error
  });
