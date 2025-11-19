"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import logo from "../../../../public/brand/logo.png";

export const SignOutTopBar = () => {
  const t = useTranslations("landing.topbar");
  const locale = useLocale();
  const pathname = usePathname();

  const homeHref = `/${locale}/landing`;
  const registerHref = `/${locale}/register`;
  const loginrHref = `/${locale}/login`;

  const isRegisterPage = pathname?.includes("/register");
  const isLoginPage = pathname?.includes("/login");

  return (
    <header className="bg-gray">
      <div className="container p-10 flex h-14 items-center justify-between">
        <Link
          href={homeHref}
          aria-label={t("brand")}
          className="inline-flex items-center"
        >
          <Image src={logo} alt={t("brand")} priority className="h-11 w-auto" />
        </Link>

        <nav className="flex items-center gap-10">
          <button
            type="button"
            disabled
            className="cursor-not-allowed font-medium"
          >
            {t("brand")}
          </button>

          <span className="font-medium">|</span>

          <Link
            href={loginrHref}
            className={clsx(
              "font-medium",
              isLoginPage ? "text-orange" : "text-white"
            )}
          >
            {t("login")}
          </Link>
          <Link
            href={registerHref}
            className={clsx(
              "w-37.5 font-medium rounded-lg py-2 px-3 gap-2 text-white text-center transition",
              isRegisterPage ? "bg-orange" : "bg-blue"
            )}
          >
            {t("register")}
          </Link>
        </nav>
      </div>
    </header>
  );
};
