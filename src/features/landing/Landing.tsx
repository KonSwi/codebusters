import React from "react";
import { SocialMediaBar } from "./components/SocialMediaBar";
import { SignOutTopBar } from "./components/SignOutTopBar";
import { HeroImage } from "./components/HeroImage";
import { Content } from "./components/Content";
import { Trust } from "./components/Trust";
import { Footer } from "./components/Footer";

export const Landing = () => {
  const VIDEO_ID = "fBGhBP476zE";

  return (
    <>
      <div className="min-h-dvh">
        <SocialMediaBar />
        <SignOutTopBar />
        <main className="pb-15">
          <HeroImage />
          <Content variant="videoRight" videoId={VIDEO_ID} />
          {/* videoRight or videoLeft */}
          <Trust />
        </main>
      </div>
      <Footer />
    </>
  );
};
