"use client";

import { useEffect, useId, useRef } from "react";
import Script from "next/script";

type TurnstileProps = {
  onToken: (token: string) => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void },
      ) => string;
    };
  }
}

/**
 * Widget Cloudflare Turnstile (anti-spam). Só renderiza quando
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY está configurada — em ambiente de
 * demonstração o formulário segue protegido apenas pelo honeypot.
 */
export function Turnstile({ onToken }: TurnstileProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerId = useId().replace(/:/g, "");
  const rendered = useRef(false);

  useEffect(() => {
    if (!siteKey || rendered.current) return;
    const tryRender = () => {
      const el = document.getElementById(containerId);
      if (el && window.turnstile && !rendered.current) {
        rendered.current = true;
        window.turnstile.render(el, { sitekey: siteKey, callback: onToken });
      }
    };
    const interval = setInterval(tryRender, 300);
    return () => clearInterval(interval);
  }, [siteKey, containerId, onToken]);

  if (!siteKey) return null;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div id={containerId} />
    </>
  );
}
