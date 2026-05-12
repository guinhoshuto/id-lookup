import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Script from 'next/script'
import TagManager from 'react-gtm-module'

export default function App({ Component, pageProps }: AppProps) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  useEffect(() => {
    if (!gtmId) {
      return
    }

    TagManager.initialize({ gtmId })
  }, [gtmId])

  return (
    <>
      {adSenseClientId ? (
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
          crossOrigin="anonymous"
        />
      ) : null}
      <Component {...pageProps} />
    </>
  )
}
