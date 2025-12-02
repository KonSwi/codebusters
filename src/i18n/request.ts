import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const l = (locale ?? "pl") as "pl" | "en";

  const messages = (await import(`../messages/${l}.json`)).default;

  return { locale: l, messages };
});
