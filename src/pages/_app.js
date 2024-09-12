import '@fotoverse/styles/globals.css'
import Header from '@fotoverse/components/Header'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
