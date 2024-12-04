import localFont from "next/font/local";

/** Inter variable (100–900), the only typeface on the site. */
export const inter = localFont({
  src: "../public/fonts/inter-variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});
