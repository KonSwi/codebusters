import React, { use } from "react";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const messages = use(getMessages({ locale }));

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return [{ locale: "pl" }, { locale: "en" }];
}