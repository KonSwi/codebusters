"use client";

import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("landing.footer");

  return (
    <footer
      role="contentinfo"
      className="
        fixed inset-x-0 bottom-0 z-50
        h-[5rem]
        bg-gray
      "
    >
      <div className="container flex h-full items-center justify-between gap-[0.75rem] flex-row px-[2.5rem]">
        <nav className="flex items-center gap-[2.5rem] ">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="cursor-not-allowed font-medium"
          >
            {t("site")}
          </button>
          <span className="font-medium">|</span>
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="cursor-not-allowed font-medium"
          >
            {t("privacy")}
          </button>
          <span className="font-medium">|</span>
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="cursor-not-allowed font-medium"
          >
            {t("contact")}
          </button>
        </nav>
        <div className="inline-flex items-center gap-[0.375rem] font-medium">
          <span>💛</span>
          <span>{t("copyright")}</span>
        </div>
      </div>
    </footer>
  );
};
