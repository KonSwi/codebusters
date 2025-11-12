"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import logo from "../../../../public/brand/logo.png";

export const SignOutTopBar = () => {
  const t = useTranslations("landing.topbar");
  const locale = useLocale();
  const homeHref = `/${locale}/landing`;

  return (
    <header className="bg-gray">
      <div className="container p-10 flex h-14 items-center justify-between">
        <Link
          href={homeHref}
          aria-label={t("brand")}
          className="inline-flex items-center"
        >
          <Image
            src={logo}
            alt={t("brand")}
            priority
            className="h-11 w-auto"
          />
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
          <button
            type="button"
            disabled
            className="cursor-not-allowed font-medium"
          >
            {t("login")}
          </button>
          <button
            type="button"
            disabled
            className="w-37.5 cursor-not-allowed font-medium bg-blue rounded-lg py-2 px-3 gap-2"
          >
            {t("register")}
          </button>
        </nav>
      </div>
    </header>
  );
};
