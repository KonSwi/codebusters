"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { getLoginSchema, LoginSchema } from "../schema";
import { Button } from "@/shared/components/Button";

export const LoginForm = () => {
  const t = useTranslations("login");
  const locale = useLocale();
  const registerHref = `/${locale}/register`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(getLoginSchema(locale)),
    mode: "onChange",
  });
  const onSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-md bg-gray p-8 rounded-lg flex flex-col gap-8 z-0 shadow-[0px_0px_10px_0px_#00000099] mt-4 mb-24">
      <h1 className="text-articleBigFont font-extralight">{t("title")}</h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <label className="text-">{t("email")}</label>
          <input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            className={clsx(
              "w-full text-formFont rounded-md bg-formGray placeholder-formPlaceholder px-4 py-3 border border-formBorder",
              { "outline outline-red": errors.email }
            )}
          />
          <span className="text-red text-formErrorFont font-extralight">
            {errors.email?.message}
          </span>
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">{t("password")}</label>
          <input
            {...register("password")}
            type="password"
            placeholder="•••••••••"
            className={clsx(
              "w-full text-formFont rounded-md bg-formGray placeholder-formPlaceholder px-4 py-3 border border-formBorder",
              { "outline outline-red": errors.password }
            )}
          />
          <span className="text-red text-formErrorFont font-extralight">
            {errors.password?.message}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-4 text-sm">
            <input
              type="checkbox"
              className="appearance-none bg-formGray border-formBorder rounded w-4 h-4 cursor-pointer relative checked:bg-blue checked:border-blue checked:before:content-['✔'] checked:before:absolute checked:before:-top-0.5 checked:before:left-0.5 checked:before:text-white"
            />
            {t("rememberMe")}
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button type="submit" variant="blue" disabled>
          {t("submit")}
        </Button>
        <Link href="" className="text-blue text-sm underline">
          {t("forgotPassword")}
        </Link>
      </div>
      <Button type="button" variant="black" disabled>
        <span>{t("loginWithGithub")}</span>
        <Image src="/icons/github.svg" alt="Github" width={18} height={18} />
      </Button>
      <p className="text-sm mt-1">
        {t("noAccount")}{" "}
        <Link href={registerHref} className="text-blue underline">
          {t("register")}
        </Link>
      </p>
    </form>
  );
};
