"use client";

import Image from "next/image";
import { LoginForm } from "./LoginForm"
import { SocialMediaBar } from "@/features/landing/components/SocialMediaBar";
import { SignOutTopBar } from "@/features/landing/components/SignOutTopBar";
import { Footer } from "@/features/landing/components/Footer";

export default function LoginPage() {
  return (
    <>
      <div className="min-h-dvh flex flex-col">
        <SocialMediaBar />
        <SignOutTopBar />
        <main className="relative flex flex-1 items-center justify-center bg-dark/90">
          <Image
            src="/hero/heroImage.jpg"
            alt="Background"
            fill
            priority
            className="object-cover object-center blur-[10px] brightness-80"
          />
          <LoginForm /> 
        </main>
      </div>
      <Footer />
    </>
  );
}   