"use client";

import Image from "next/image";
import { SocialMediaBar } from "@/features/landing/components/SocialMediaBar";
import { SignOutTopBar } from "@/features/landing/components/SignOutTopBar";
import { RegisterForm } from "@/features/register/components/RegisterForm";
import { Footer } from "@/features/landing/components/Footer";

export const Register = () => {
  return (
    <>
      <div className="min-h-dvh flex flex-col">
        <SocialMediaBar />
        <SignOutTopBar />
        <main className="relative flex flex-1 items-center justify-center">
          <Image
            src="/hero/heroImage.jpg"
            alt="Background"
            fill
            priority
            className="object-cover object-center brightness-20 blur-xs"
          />
          <RegisterForm />
        </main>
      </div>
      <Footer />
    </>
  );
}