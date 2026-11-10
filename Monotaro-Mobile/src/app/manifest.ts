import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Monotaro ID",
    short_name: "Monotaro",
    description: "Ecommerce Perkakas Industri & ATK Perusahaan",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#e60012",
    orientation: "portrait",
    icons: [
      { src: "/LogoTab.png", sizes: "192x192", type: "image/png" },
      { src: "/LogoTab.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
