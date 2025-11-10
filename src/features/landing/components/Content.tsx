"use client";

import React from "react";
import { useTranslations } from "next-intl";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

type Props = {
  variant?: "videoRight" | "videoLeft";
  videoId: string;
};

export const Content = ({ variant = "videoRight", videoId }: Props) => {
  const t = useTranslations("landing.content");
  const videoLeft = variant === "videoLeft";

  return (
    <section className="container">
      <div
        className={`flex flex-col items-start gap-[2rem] px-[2.5rem] py-[3.75rem] flex gap-[7.6875rem] ${
          videoLeft ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="flex-1 flex flex-col gap-[2.0625rem]">
          <h2 className="text-[4rem] font-extrabold text-dark leading-[3.75rem] tracking-[-0.01rem]">
            {t("what.title")}
          </h2>
          <p className="text-[1.25rem] text-gray ">{t("what.bodyFirst")}</p>
          <p className="text-[1.25rem] text-gray ">{t("what.bodySecond")}</p>
        </div>
        <div className="flex-1">
          <div className="overflow-hidden shadow-[0_0.625rem_0.625rem_0_#0000000A,0_1.25rem_1.5625rem_-0.3125rem_#0000001A]">
            <div className="aspect-video">
              <LiteYouTubeEmbed id={videoId} title="Codebusters overview" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
