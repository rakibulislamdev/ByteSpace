import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The dev server blocks cross-origin access to /_next/hmr unless the host
   * is listed here. Without it, loading the app via 127.0.0.1 instead of
   * localhost silently fails to bootstrap the client runtime: the page
   * renders server HTML and never hydrates, so every onClick handler and
   * effect is dead while the markup still looks correct.
   */
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
