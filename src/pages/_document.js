import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="min-vh-100" lang="en">
      <Head />
      <body className="min-vh-100 position-relative">
        <Main />
        <NextScript />
        <style jsx global>{`
          #__next {
            min-height: 100vh;
          }
        `}</style>
      </body>
    </Html>
  )
}
