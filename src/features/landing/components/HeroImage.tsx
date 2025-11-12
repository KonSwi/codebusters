"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export const HeroImage = () => {
  const t = useTranslations("landing.hero");

  return (
    <section
      data-testid="hero-image"
      className="relative w-full overflow-hidden h-120"
    >
      <div className="absolute inset-0 bg-gray/90" />
      <div className="container relative z-10 flex flex-col items-center gap-3 py-21.25">
        <h1 className="text-titleBigFont font-extrabold leading-15 tracking-[-0.01rem]">
          {t("title")}
        </h1>
        <div className="inline-flex flex-col items-center gap-2">
          <span className="text-articleBigFont">{t("by")}</span>
          <Image
            src="/hero/devstockBaner.svg"
            alt={t("brand")}
            width={180}
            height={46}
            className="h-auto w-45"
            priority
          />
        </div>
        <p className="max-w-184 text-articleBigFont text-center">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap items-center gap-8">
          <button
            type="button"
            disabled
            className="w-50 inline-flex items-center justify-center rounded-lg bg-red px-5 py-3 font-semibold cursor-not-allowed"
          >
            {t("ctaStart")}
          </button>
          <button
            type="button"
            disabled
            className="w-50 inline-flex items-center justify-center rounded-lg border border-white px-5 py-3 font-semibold cursor-not-allowed"
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
