import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["pl", "en"],
  defaultLocale: "pl",
  localePrefix: "as-needed",
  localeDetection: false,
});

export const config = {
  matcher: [
    "/",
    "/(pl|en)/:path*",
    "/((?!_next|_vercel|.*\\..*|api).*)",
  ],
};
