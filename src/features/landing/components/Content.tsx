"use client";

import React from "react";
import { useTranslations } from "next-intl";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import clsx from "clsx";

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
        className={clsx("flex flex-col items-start px-10 py-15 gap-30.75", {
          "flex-row-reverse": videoLeft,
          "flex-row": !videoLeft,
        })}
      >
        <div className="flex-1 flex flex-col gap-8.25">
          <h2 className="text-titleBigFont font-extrabold text-dark leading-15 tracking-[-0.01rem]">
            {t("what.title")}
          </h2>
          <p className="text-articleSmallFont text-gray ">
            {t("what.bodyFirst")}
          </p>
          <p className="text-articleSmallFont text-gray ">
            {t("what.bodySecond")}
          </p>
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
