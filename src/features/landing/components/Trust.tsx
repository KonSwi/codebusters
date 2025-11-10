"use client";

import React from "react";
import { useTranslations } from "next-intl";

export const Trust = () => {
  const t = useTranslations("landing.content");

  return (
    <section className="container py-[4rem] flex justify-center">
      <div className="items-start gap-[0.5rem] max-w-[49.375rem] border border-[0.125rem] border-grayBorder rounded-[0.5rem] p-[2rem] flex flex-col shadow-[0_0.125rem_0.25rem_-0.125rem_#0000000D,0_0.25rem_0.375rem_-0.0625rem_#0000001A]">
        <h3 className="text-[2rem] text-dark font-extralight">
          {t("trust.title")}
        </h3>
        <p className="text-[1.125rem] text-grayLight font-extralight">
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
