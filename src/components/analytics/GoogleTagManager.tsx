import Script from "next/script";
import { siteConfig } from "@/config/site";

/**
 * Carrega o Google Tag Manager. O container é carregado sempre (recomendado
 * pelo Consent Mode v2), mas os sinais de consentimento são definidos antes
 * dele (ver ConsentInit) para que as tags configuradas no próprio GTM
 * respeitem o consentimento da pessoa.
 */
export function GoogleTagManager() {
  const gtmId = siteConfig.analytics.gtmId;
  if (!gtmId) return null;

  return (
    <>
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
