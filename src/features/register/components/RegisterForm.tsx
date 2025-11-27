"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRegisterSchema, RegisterSchema } from "../schema";
import { RegisterModal } from "./RegisterModal";
import { Button } from "@/shared/components/Button";

export const RegisterForm: React.FC = () => {
  const t = useTranslations("register");
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const locale = useLocale();
  const loginHref = `/${locale}/login`;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(getRegisterSchema(locale)),
    mode: "onChange",
  });
  const onSubmit = (data: RegisterSchema) => {
    setEmail(data.email);
    setShowModal(true);
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-0 flex flex-col bg-gray p-8 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.6)] w-175 h-163.5 gap-3.5 mt-4 mb-24"
      >
        <h1 className="text-articleBigFont font-extralight mb-1">
          {t("title")}
        </h1>
        <div className="flex flex-row justify-between gap-1">
          <div className="w-75 flex flex-col ">
            <span className="text-formFont font-medium">{t("nickname")}</span>
            <input
              {...register("nickname")}
              placeholder={t("nickname")}
              className={clsx(
                "w-full text-formFont rounded-md bg-formGray placeholder-formPlaceholder px-4 py-3 border border-formBorder",
                { "outline outline-red": errors.nickname }
              )}
            />
            <span className="font-extralight text-red text-formErrorFont h-4.5">
              {errors.nickname?.message || ""}
            </span>
          </div>
          <div className="w-75 flex flex-col">
            <span className="text-formFont font-medium">{t("firstName")}</span>
            <input
              {...register("firstName")}
              placeholder={t("firstName")}
              className={clsx(
                "w-full text-formFont rounded-md bg-formGray placeholder-formPlaceholder px-4 py-3 border border-formBorder",
                { "outline outline-red": errors.firstName }
              )}
            />
            <span className="font-extralight text-red text-formErrorFont h-4.5">
              {errors.firstName?.message || ""}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-75 flex flex-col">
            <span className="text-formFont font-medium">{t("lastName")}</span>
            <input
              {...register("lastName")}
              placeholder={t("lastName")}
              className={clsx(
                "w-full text-formFont rounded-md bg-formGray placeholder-formPlaceholder px-4 py-3 border border-formBorder",
                { "outline outline-red": errors.lastName }
              )}
            />
            <span className="font-extralight text-red text-formErrorFont h-4.5">
              {errors.lastName?.message || ""}
            </span>
          </div>
          <div className="w-75 flex flex-col">
            <span className="text-formFont font-medium">{t("email")}</span>
            <input
              {...register("email")}
              placeholder="name@example.com"
              type="email"
              className={clsx(
                "w-full text-formFont rounded-md bg-formGray placeholder-formPlaceholder px-4 py-3 border border-formBorder",
                { "outline outline-red": errors.email }
              )}
            />
            <span className="font-extralight text-red text-formErrorFont h-4.5">
              {errors.email?.message || ""}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-formFont font-medium">{t("password")}</span>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••••"
            className={clsx(
              "w-full text-formFont rounded-md bg-formGray placeholder-formPlaceholder px-4 py-3 border border-formBorder",
              { "outline outline-red": errors.password }
            )}
          />
          <span className="font-extralight text-red text-formErrorFont h-4.5">
            {errors.password?.message || ""}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-formFont font-medium">
            {t("confirmPassword")}
          </span>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="••••••••••"
            className={clsx(
              "w-full text-formFont rounded-lg bg-formGray placeholder-formPlaceholder gap-2.5 px-4 py-3 border border-formBorder",
              { "outline outline-red": errors.confirmPassword }
            )}
          />
          <span className="font-extralight text-red text-formErrorFont h-4.5">
            {errors.confirmPassword?.message || ""}
          </span>
        </div>
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="appearance-none bg-formGray border-formBorder rounded w-4 h-4 cursor-pointer relative checked:bg-blue checked:border-blue checked:before:content-['✔'] checked:before:absolute checked:before:-top-0.5 checked:before:left-0.5 checked:before:text-white"
            />
            <span>
              {t("acceptTerms")}{" "}
              <Link href="#" className="text-blue hover:underline">
                {t("termsLink")}
              </Link>
            </span>
          </label>
          <span className="font-extralight text-red text-formErrorFont h-4.5">
            {errors.acceptTerms?.message || ""}
          </span>
        </div>
        <Button
          type="submit"
          disabled={!isValid}
          variant="blue"
          className="w-full py-2.5 px-5 mb-1 text-lg font-semibold"
        >
          {t("submit")}
        </Button>
        <div className="flex">
          <p className="text-center text-sm mt-2">
            {t("alreadyHaveAccount")}{" "}
            <Link href={loginHref} className="text-blue hover:underline">
              {t("loginLink")}
            </Link>
          </p>
        </div>
      </form>
      {showModal && (
        <RegisterModal email={email} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};
