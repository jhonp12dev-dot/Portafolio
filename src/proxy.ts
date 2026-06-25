import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en", "pt", "zh", "ko", "ru"];
const defaultLocale = "es";

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  // Parsear la cabecera accept-language, ej. "en-US,en;q=0.9,es;q=0.8"
  const preferredLocales = acceptLanguage
    .split(",")
    .map((lang) => {
      const [locale] = lang.split(";q=");
      return locale.trim().split("-")[0].toLowerCase();
    });

  for (const locale of preferredLocales) {
    if (locales.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Excluir archivos estáticos de /public, llamadas a API y archivos SEO
  if (
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Verificar si el pathname ya contiene un locale soportado
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Si no tiene locale, redirigir al locale adecuado según el navegador
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Ejecutar en todas las rutas excepto recursos internos de Next.js (_next)
    "/((?!_next|static|favicon.ico).*)",
  ],
};
