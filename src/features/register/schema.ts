import { z } from 'zod'

export const getRegisterSchema = (locale: string) => {
  const isEn = locale === 'en'

  return z
    .object({
      email: z
        .string()
        .email(
          isEn
            ? 'The e-mail must have a correct format'
            : 'E-mail musi mieć poprawny format'
        ),
      password: z
        .string()
        .min(
          8,
          isEn
            ? 'The password must contain the required number of characters'
            : 'Hasło musi zawierać odpowiednią ilość znaków'
        )
        .regex(
          /[A-Z]/,
          isEn
            ? 'The password must contain at least one uppercase letter'
            : 'Hasło musi zawierać co najmniej jedną wielką literę'
        )
        .regex(
          /[a-z]/,
          isEn
            ? 'The password must contain at least one lowercase letter'
            : 'Hasło musi zawierać co najmniej jedną małą literę'
        )
        .regex(
          /[0-9]/,
          isEn
            ? 'The password must contain at least one number'
            : 'Hasło musi zawierać co najmniej jedną cyfrę'
        )
        .regex(
          /[^A-Za-z0-9]/,
          isEn
            ? 'The password must contain at least one special character'
            : 'Hasło musi zawierać co najmniej jeden znak specjalny'
        ),

      confirmPassword: z.string(),

      nickname: z
        .string()
        .min(2, isEn ? 'Nickname is required' : 'Pseudonim jest wymagany'),

      firstName: z
        .string()
        .min(2, isEn ? 'First name is required' : 'Imię jest wymagane'),

      lastName: z
        .string()
        .min(2, isEn ? 'Last name is required' : 'Nazwisko jest wymagane'),

      acceptTerms: z
        .boolean()
        .refine(
          (val) => val === true,
          isEn
            ? 'You must accept the terms and conditions of service!'
            : 'Musisz zaakceptować zasady i warunki świadczenia usług!'
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: isEn ? 'The password is inconsistent' : 'Hasło jest niezgodne',
    })
}

export type RegisterSchema = z.infer<ReturnType<typeof getRegisterSchema>>
