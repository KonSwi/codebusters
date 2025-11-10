"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export const HeroImage = () => {
  const t = useTranslations("landing.hero");

  return (
    <section
      data-testid="hero-image"
      className="
        relative w-full 
        overflow-hidden
        h-[30rem]
      "
    >
      <div className="absolute inset-0 bg-gray/90" />
      <div className="container relative z-10 flex flex-col items-center gap-[0.75rem] py-[5.316875rem]">
        <h1 className="text-[4rem] font-extrabold leading-[3.75rem] tracking-[-0.01rem]">
          {t("title")}
        </h1>
        <div className="inline-flex flex-col items-center gap-[0.5rem]">
          <span className="text-[1.5rem]">{t("by")}</span>
          <img
            src="/hero/devstockBaner.svg"
            alt={t("brand")}
            width={180}
            height={46}
            className="h-auto w-[11.25rem]"
          />
        </div>
        <p className="max-w-[46rem] text-[1.5rem] text-center">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap items-center gap-[2rem]">
          <button
            type="button"
            disabled
            className="w-[12.5rem]
              inline-flex items-center justify-center
              rounded-[0.5rem] bg-red px-[1.25rem] py-[0.75rem]
              font-semibold
              cursor-not-allowed
            "
          >
            {t("ctaStart")}
          </button>
          <button
            type="button"
            disabled
            className="w-[12.5rem]
              inline-flex items-center justify-center
              rounded-[0.5rem] border border-white
              px-[1.25rem] py-[0.75rem]  font-semibold
              cursor-not-allowed
            "
          >
            {t("ctaAcademy")}
          </button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero/heroImage.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
};
