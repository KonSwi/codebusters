import { z } from "zod";

export const getLoginSchema = (locale: string) =>
  z.object({
    email: z
      .string()
      .email(
        locale === "pl"
          ? "E-mail musi mieć poprawny format"
          : "The e-mail must have a correct format"
      ),
    password: z
      .string()
      .min(
        1,
        locale === "pl"
          ? "Coś poszło nie tak!"
          : "Something went wrong!"
      ),
  });

export type LoginSchema = z.infer<ReturnType<typeof getLoginSchema>>;
