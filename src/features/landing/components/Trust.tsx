"use client";

import React from "react";
import { useTranslations } from "next-intl";

export const Trust = () => {
  const t = useTranslations("landing.content");

  return (
    <section className="container py-16 flex justify-center">
      <div className="items-start gap-2 max-w-197.5 border-2 border-grayBorder rounded-lg p-8 flex flex-col shadow-[0_0.125rem_0.25rem_-0.125rem_#0000000D,0_0.25rem_0.375rem_-0.0625rem_#0000001A]">
        <h3 className="text-titleSmallFont text-dark font-extralight">
          {t("trust.title")}
        </h3>
        <p className="text-articleSmallFont text-grayLight font-extralight">
          {t("trust.body")}
        </p>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex font-medium cursor-not-allowed items-center justify-center text-blue"
        >
          {t("trust.ctaMeet")}
        </button>
      </div>
    </section>
  );
};
